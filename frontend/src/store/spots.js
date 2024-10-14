const LOAD_SPOTS = 'spots/LOAD_SPOTS';
const LOAD_SPOT_DETAILS = 'spots/LOAD_SPOT_DETAILS';



export const loadSpots = (spots) => ({
    type: LOAD_SPOTS,
    spots
});

export const loadSpotDetails = (spot) => ({
    type: LOAD_SPOT_DETAILS,
    spot
});


export const fetchSpots = () => async (dispatch) => {
    const response = await fetch('/api/spots');
    if (response.ok) {
        // const spots = await response.json();
        // dispatch(loadSpots(spots));
        const data = await response.json();
        if (Array.isArray(data.Spots)) {  
            dispatch(loadSpots(data.Spots));
          } else {
            console.error("response is not an array", data);
          }
        // return spots;
    }   else {
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

const initialState = { allSpots: [], spotDetails: null };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_SPOTS:
      return { ...state, allSpots: action.spots };
    case LOAD_SPOT_DETAILS: 
    return { ...state, spotDetails: action.spot }
    default:
      return state;
  }
};

export default spotsReducer;