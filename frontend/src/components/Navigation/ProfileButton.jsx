// import { PiUserSwitchThin } from "react-icons/pi"; 
import { HiMiniUser } from "react-icons/hi2";
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

// const ProfileButton = () => {
//     return (
//         <div style={{ color: "black", fontSize: "40px" }}>
//             {/* <PiUserSwitchThin /> */}
//             <HiMiniUser />
//         </div>
//     )
// }      
{/* <HiMiniUser /> */}
// 

// export default ProfileButton;

// frontend/src/components/Navigation/ProfileButton.jsx

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  useEffect(() => {
    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener('click', closeMenu);
  }, []);

  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep click from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={toggleMenu}>
      <HiMiniUser />
      </button>
      <ul className={ulClassName}>
        <li>{user.username}</li>
        <li>{user.firstName} {user.lastName}</li>
        <li>{user.email}</li>
        <li>
          <button onClick={logout}>Log Out</button>
        </li>
      </ul>
    </>
  );
}

export default ProfileButton;