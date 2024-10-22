import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
const CREATE_SPOT = 'spots/CREATE_SPOT';
const CREATE_SPOT_IMAGE = 'spots/CREATE_SPOT_IMAGES';
const CREATE_REVIEW = 'spots/CREATE_REVIEW';
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS';



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
    console.log('\n= spotId in thunk =\n', spotId)
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
    // case LOAD_REVIEWS: 
    // console.log(`\n === reviews in state ===\n`, reviews)
    //   return { ...state, reviews: action.reviews };
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
    // case CREATE_REVIEW: 
    //  return {
    //     ...state, reviews: [...state.reviews, action.review]
    //  }
    case CREATE_REVIEW: 
        return {
        ...state,
        spotDetails: {
            numReviews: (state.spotDetails?.numReviews ?? 0) + 1,
            avgRating: (
            state.reviews.reduce((sum, review) => {
                if (review.spotId === action.review.spotId) return sum + review.stars;
                return sum;
            }, 0) / state.spotDetails.numReviews
            ),
        },
        reviews: [...state.reviews, action.review]
        }
    default:
      return state;
  }
};

export default spotsReducer;