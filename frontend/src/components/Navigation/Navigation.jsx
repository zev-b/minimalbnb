// frontend/src/components/Navigation/Navigation.jsx

import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <ul className="navigation">
      <li className="navigation-item">
        <NavLink to="/">
        <img className="logo-image" src="/Screenshot 2024-10-11 162225.png" alt="logo-image" />
        <img className='logo-image2' src="https://i.ibb.co/Kr1TMX7/Screenshot-2024-10-14-224148.png" alt="website-name-minimalbnb" /></NavLink>
      </li>
      {isLoaded && (
        <li className="navigation-item navigation-buttons">
            {!!sessionUser && (<Link to='/spots/new' className="create-spot-button">Create a New Spot</Link>)}
          <ProfileButton user={sessionUser} />
        </li>
      )}
    </ul>
  );
}

export default Navigation;