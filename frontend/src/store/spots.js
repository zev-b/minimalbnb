import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGES';
const CREATE_REVIEW = 'spots/CREATE_REVIEW';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';
const DEL_SPOT = 'spots/DEL_SPOT';
const DEL_REVIEW = 'spots/DEL_REVIEW';



const normalizeSpots = (spots) => {
    return spots.reduce((collection, spot) => {
      collection[spot.id] = spot;
      return collection;
    }, {});
  }
  
export const loadSpots = (spots) => ({
      type: LOAD_SPOTS,
      spots: normalizeSpots(spots)
  });
  
export const loadSpotDetails = (spot) => ({
      type: LOAD_SPOT_DETAILS,
      spot
  });
  
export const loadReviews = (reviews) => ({
      type: LOAD_REVIEWS,
      reviews
  })
  
export const createSpot = (newSpot) => ({
      type: CREATE_SPOT,
      newSpot
  })
  
export const createSpotImage = (image) => ({
      type: CREATE_SPOT_IMAGE,
      image
  })
  
export const createReview = (review) => ({
      type: CREATE_REVIEW,
      review
  });
  
export const loadUserSpots = (spots) => ({
      type: LOAD_USER_SPOTS,
      spots: normalizeSpots(spots)
  })

export const deleteSpot = (spotId) => ({
    type: DEL_SPOT,
    spotId
})

export const deleteReview = (reviewId) => ({
    type: DEL_REVIEW,
    reviewId
})

// export const fetchSpots = () => async (dispatch) => {
//     const response = await fetch('/api/spots');
//     if (response.ok) {
//         const data = await response.json();
//         if (Array.isArray(data.Spots)) {
            
//             const spotsObject = data.Spots.reduce((acc, spot) => {
//                 acc[spot.id] = spot; 
//                 return acc;
//             }, {});
//             dispatch(loadSpots(spotsObject));
//         } else {
//             console.error("response is not an array", data);
//         }
//     } else {
//         console.error('Failed to fetch spots');
//     }
// };

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadSpots(data.Spots));
        return data.Spots;
    } else {
        console.error('Failed to fetch spots');
    }
};

export const fetchSpotDetails = (spotId) => async (dispatch) => {
    const response = await fetch(`/api/spots/${spotId}`);
    if (response.ok) {
        const spot = await response.json();
        dispatch(loadSpotDetails(spot));
    } else {
        console.error(`Failed to get details for spotId: ${spotId}`);
    }
}

export const fetchReviews = (spotId) => async (dispatch) => {
    // console.log('\n= spotId in thunk =\n', spotId)
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews?.Reviews));
        // console.log(`\n === reviews in thunk ===\n`, reviews)
    } else {
        console.error(`Failed to get reviews for spotId: ${spotId} `);
    }
}

export const createSpotThunk = (newSpotData) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(newSpotData),
    });

    const newSpot = await response.json();

    if (response.ok) {
        dispatch(createSpot(newSpot));
    }
        return newSpot;
}


export const createSpotImagesThunk = (images, spotId) => async (dispatch) => {
    const retObj = { images: [], errors: [] };
    
    for (let i = 0; i < images.length; i++) {
        // console.log(images[i]);
        const response = await csrfFetch(`/api/spots/${spotId}/images`, {
            method: 'POST',
            body: JSON.stringify(images[i]),
        });
        
        const data = await response.json();
        if (response.ok) {
            retObj.images[i] = data;
        } else {
            retObj.errors[i] = data;
        }
        
        dispatch(createSpotImage(data))
    }
    
    return retObj;
};

export const createReviewThunk = (spotId, reviewData) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        body: JSON.stringify(reviewData),
    });
    
    if (response.ok) {
        const newReview = await response.json();
        dispatch(createReview(newReview));
        return newReview;
    } else {
        const errors = await response.json();
        return errors;
    }
};

export const fetchUserSpotsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/spots/current');
    if (response.ok) {
        const data = await response.json();
        dispatch(loadUserSpots(data.Spots))
    }
};

export const deleteSpotThunk = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteSpot(spotId));
    } else {
        return response.json();
    }
};

export const deleteReviewThunk = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE',
    })
    if (response.ok) {
        dispatch(deleteReview(reviewId));
    } else {
        return response.json();
    }
}

const initialState = { 
    allSpots: {}, 
    spotDetails: null, 
    reviews: [],
    spotImages: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
    case LOAD_USER_SPOTS:
      return { ...state, allSpots: { ...state.allSpots, ...action.spots } };
    case LOAD_SPOT_DETAILS: 
      return { ...state, spotDetails: action.spot };
    case LOAD_REVIEWS:
        return {
            ...state,
            reviews: [
            ...state.reviews.filter((r) => !action.reviews.some((rvw) => rvw.id === r.id)),
            ...action.reviews,
            ],
        };
    case CREATE_SPOT: 
      return { ...state, allSpots: { ...state.allSpots, [action.newSpot.id]: action.newSpot, } };
    case CREATE_SPOT_IMAGE:
     return {
        ...state,
        allSpots: {
        ...state.allSpots,
        [action.image.spotId]: {
            ...action.image.spotId,
            SpotImages: [
            ...(state[action.image.spotId]?.SpotImages ?? []),
            action.image,
            ],
        },
        },
    };
    case CREATE_REVIEW: 
        return {
        ...state,
        spotDetails: {
            ...state.spotDetails,
            numReviews: (state.spotDetails?.numReviews ?? 0) + 1,
            avgRating: 
            state.reviews.reduce((sum, review) => {
                // console.log('\n === Way Too much Info ====\n', 'sum=', sum, 'review=', review, 'action=',action.review)
                if (review.spotId == action.review.spotId) {
                //  console.log("==== Got inside the vault! =====", sum + review.stars)
                    return sum + review.stars;
                }
                // console.log("\n === Wrong Map! ===\n", 'id', review.id)
                return sum;
            }, action.review.stars) / (state.spotDetails.numReviews + 1) 
            ,
        },
        reviews: [...state.reviews, action.review]
        }
    case DEL_SPOT: 
      return {
        ...state,
        allSpots: Object.fromEntries(Object.entries(state.allSpots).filter(([ id ]) => id != action.spotId))
    }
    case DEL_REVIEW: 
      return {
        ...state,
        reviews: state.reviews.filter((review) => review.id !== action.reviewId),
        spotDetails: {
            ...state.spotDetails,
            numReviews: (state.spotDetails?.numReviews ?? 1) - 1,
            avgRating: 
            state.reviews.reduce((sum, review) => {
                // console.log('\n === Way Too much Info ====\n', 'sum=', sum, 'review=', review, 'action=',action.review)
                if (review.spotId == action.reviewId.spotId) {
                //  console.log("==== Got inside the vault! =====", sum + review.stars)
                    return sum + review.stars;
                }
                // console.log("\n === Wrong Map! ===\n", 'id', review.id)
                return sum;
            }, 0) / ((state.spotDetails.numReviews - 1) || 1) 
            ,
        },
      }
    default:
      return state;
  }
};

export default spotsReducer;