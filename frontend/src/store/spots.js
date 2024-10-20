import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';
const LOAD_REVIEWS = 'spots/LOAD_REVIEWS';
const CREATE_SPOT = 'spots/CREATE_SPOT'



export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
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

export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.Spots)) {
            // Convert the array of spots into an object using spot IDs as keys
            const spotsObject = data.Spots.reduce((acc, spot) => {
                acc[spot.id] = spot; // Use the spot's ID as the key
                return acc;
            }, {});
            dispatch(loadSpots(spotsObject));
        } else {
            console.error("response is not an array", data);
        }
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
    const response = await fetch(`/api/spots/${spotId}/reviews`);
    if (response.ok) {
        const reviews = await response.json();
        dispatch(loadReviews(reviews?.Reviews));
    } else {
        console.error(`Failed to get reviews for spotId: ${spotId} `);
    }
}

export const createSpotThunk = (newSpotData) => async (dispatch) => {
    const response = csrfFetch('/api/spots', {
        method: 'POST',
        body: JSON.stringify(newSpotData),
    });

    const newSpot = await response.json();

    if (response.ok) {
        dispatch(createSpot(newSpot));
    } else {
        return newSpot;
    }
}

const initialState = { 
    allSpots: {}, 
    spotDetails: null, 
    reviews: [],
};

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, allSpots: { ...state.allSpots, ...action.spots } };
    case LOAD_SPOT_DETAILS: 
      return { ...state, spotDetails: action.spot };
    case LOAD_REVIEWS: 
      return { ...state, reviews: action.reviews };
    case CREATE_SPOT: 
      return { ...state, allSpots: { ...state.allSpots, [action.newSpot.id]: action.newSpot, } } 
    default:
      return state;
  }
};

export default spotsReducer;