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

    useEffect(() => {
        dispatch(fetchSpots());
    }, [dispatch]);


console.log(spots);

    const handleTileClick = (spotId) => {
        navigate(`/spots/${spotId}`);
    };

    return (
        <div className="spots-list">
            {spots.map((spot) => (
                <div 
                key={spot.id}
                className="spot-tile"
                onClick={() => handleTileClick(spot.id)}
                title={spot.name}
                >
                <img src={spot.previewImage}alt={`${spot.city}, ${spot.state}`} className="spot-thumbnail" /> 
                <div>{spot.city}, {spot.state}</div>
                <div>
                    {spot.averageRating ? spot.averageRating.toFixed(1) : 'New'}
                    <span>★</span>
                </div>
                <div>${spot.price} / night</div>
                </div>
            ))}
        </div>
    )
}

export default SpotsList;
