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
        <img className="logo-image" src="/minimalbnb.svg" alt="logo-image" />
        <span className='playwrite-us-modern-logo'>minimalbnb</span></NavLink>
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