// frontend/src/components/Navigation/Navigation.jsx

import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul>
      <li>
        <NavLink to="/"><img className="logo-image" src="/Screenshot 2024-10-11 162225.png" alt="" />Replace with minimalbnb image</NavLink>
      </li>
      {isLoaded && (
        <li>
            {!!sessionUser && (<Link to='/spots/new' className="create-spot-button">Create a New Spot</Link>)}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;