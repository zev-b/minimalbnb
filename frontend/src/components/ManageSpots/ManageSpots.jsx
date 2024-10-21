import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import './ManageSpots.css';

function ManageSpots() {
  const spots = useSelector(state => state.spots.userSpots);
  const navigate = useNavigate();

  const handleUpdateSpot = (spotId) => {
    navigate(`/spots/${spotId}/edit`);
  };

  const handleDeleteSpot = (spotId) => {
    dispatch(deleteSpotThunk(spotId)).then((success) => {
        if (success) {
          // Optionally, show a success message
        }
      });
  };

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      {spots && spots.length > 0 ? (
        <div className="spots-grid">
          {spots.map((spot) => (
            <div key={spot.id} className="spot-tile" onClick={() => navigate(`/spots/${spot.id}`)}>
              <img src={spot.previewImage} alt={spot.name} />
              <div className="spot-details">
                <h3>{spot.city}, {spot.state}</h3>
                <p>${spot.price} / night</p>
                <div className="spot-rating">{spot.avgRating} ★</div>
                <button className="update-spot-button" onClick={(e) => { e.stopPropagation(); handleUpdateSpot(spot.id); }}>Update</button>
                <button className="delete-spot-button" onClick={(e) => { e.stopPropagation(); handleDeleteSpot(spot.id); }}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No spots found. <Link to='/spots/new'>Create a New Spot</Link></p>
        </div>
      )}
    </div>
  );
}

export default ManageSpots;