// frontend/src/components/Navigation/ProfileButton.jsx

import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { HiMiniUser } from "react-icons/hi2";
import { CiMenuBurger } from "react-icons/ci";
import * as sessionActions from '../../store/session';
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginFormModal/LoginFormModal';
import SignupFormModal from '../SignupFormModal/SignupFormModal';
// import './ProfileButton.css';
import './Navigation.css';

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState(false);
    const ulRef = useRef();
  
    const toggleMenu = (e) => {
      e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
      setShowMenu(!showMenu);
    };
  
    useEffect(() => {
      if (!showMenu) return;
  
      const closeMenu = (e) => {
        if (!ulRef.current.contains(e.target)) {
          setShowMenu(false);
        }
      };
  
      document.addEventListener('click', closeMenu);
  
      return () => document.removeEventListener("click", closeMenu);
    }, [showMenu]);
  
    const closeMenu = () => setShowMenu(false);
  
    const logout = (e) => {
      e.preventDefault();
      dispatch(sessionActions.logout());
      closeMenu();
      navigate('/');
    };
  
    const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");
  
    return (
      <>
        <button onClick={toggleMenu}>
            <CiMenuBurger />
            <HiMiniUser />
        </button>
        <ul className={ulClassName} ref={ulRef}>
          {user ? (
            <>
              <li>Hello, {user.username}</li>
              <li>{user.email}</li>
              <li>
                <button 
                  onClick={() => {
                      navigate('/spots/manage-spots')
                      closeMenu()
                    }}>Manage Spots</button>
              </li>
              <li>
                <button onClick={logout}>Log Out</button>
              </li>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
                className="btn-in-dropdwn"
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
                className="btn-in-dropdwn"
              />
            </>
          )}
        </ul>
      </>
    );
  }
  
  export default ProfileButton;