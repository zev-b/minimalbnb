import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSpots } from "../../store/spots";
import { useNavigate } from "react-router-dom";
import './SpotsList.css';
// import spot from "../../../../backend/db/models/spot";

function SpotsList() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const spots = useSelector(state => state.spots.allSpots);
    // console.log(spots);

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);


    const spotsArray = Object.values(spots);
    
    console.log("Spots Array:", spotsArray);

    const handleTileClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    };


    return (
        <div className="spots-list">
            {spotsArray.map((spot) => (
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
                                 <span className="star-icon">★ </span> 
                                     {spot.avgRating > 0 ? spot.avgRating.toFixed(1) : 'New'}
                             </div>
                         </div>
                         <div>${spot.price} / night</div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default SpotsList;
