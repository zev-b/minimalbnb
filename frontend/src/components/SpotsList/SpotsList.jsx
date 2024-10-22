import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots, fetchReviews } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import './SpotsList.css';
// import spot from "../../../../backend/db/models/spot";
import { RiStarSFill } from "react-icons/ri";

function SpotsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector(state => state.spots.allSpots);
    // console.log(spots);


    // useEffect(() => {
    //     dispatch(fetchSpots());
    // }, [dispatch]);

    useEffect(() => {
        dispatch(fetchSpots())
          .then((spots) => spots.forEach((spot) => dispatch(fetchReviews(spot.id))));
      }, [dispatch]);


    // const spotsArray = Object.values(spots);
    
    // console.log("Spots Array:", spotsArray);

    const handleTileClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    };


    return (
        <div className="spots-list">
            {Object.values(spots).map((spot) => (
                <div 
                key={spot.id}
                className="spot-tile"
                onClick={() => handleTileClick(spot.id)}
                title={spot.name}
                >
                <img src={spot.previewImage}alt={`${spot.name} -Image`} className="spot-thumbnail" /> 
                <div className="spot-info">
                     <div className="location-rating">
                        <span>{spot.city}, {spot.state}</span>
                             <div className="spot-rating">
                                 <span className="star-icon"><RiStarSFill className="star-icon"/></span> 
                                     {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}
                             </div>
                         </div>
                         <div>${parseFloat(spot.price).toFixed(2)} / night</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpotsList;
