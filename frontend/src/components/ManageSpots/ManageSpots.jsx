import { useSelector, useDispatch, } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchUserSpotsThunk } from '../../store/spots';
import './ManageSpots.css';
import { RiStarSFill } from "react-icons/ri";
import OpenModalButton from '../OpenModalButton/OpenModalButton';
import DelSpotModal from '../DelSpotModal/DelSpotModal';


function ManageSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(state => state.session.user);   
  const allSpots = useSelector(state => state.spots.allSpots);
  const [userSpots, setUserSpots] = useState([]);

  useEffect(() => {
    dispatch(fetchUserSpotsThunk()); 
  }, [dispatch]);

  useEffect(() => { 
    setUserSpots(Object.values(allSpots).filter(spot => spot.ownerId === user?.id));
  }, [allSpots, user]);

  const handleUpdateSpot = (e, spotId) => {
    e.stopPropagation();
    navigate(`/spots/${spotId}/edit`);
  };


  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      {userSpots && userSpots.length > 0 ? (
        <div className="spots-grid">

          {userSpots.map((spot) => (
            <div key={spot.id} className="spot-tile" onClick={() => navigate(`/spots/${spot.id}`)}>
              <img src={spot.previewImage} alt={spot.name} />
              <div className="spot-details">
                <div className='spot-card-header'>

                <h3>{spot.city}, {spot.state}</h3>
                <div className="spot-rating">
                    <RiStarSFill className="star-icon"/> {spot.avgRating > 0 ? spot.avgRating.toFixed(2) : 'New'}
                </div>
              </div>
              <p>${parseFloat(spot.price).toFixed(2)} / night</p>

                <button className="update-spot-button" onClick={(e) => handleUpdateSpot(e, spot.id)}>Update</button>

                <OpenModalButton buttonText="Delete" className="delete-spot-button" modalComponent={<DelSpotModal spotId={spot.id}/>}/>
                </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <p>No spots found. <Link to='/spots/new'><button>Create a New Spot</button></Link></p>
        </div>
      )}
    </div>
  );
}

export default ManageSpots;