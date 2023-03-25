'use client'

import { useState, useEffect, useRef } from "react";
import OpenModalMenuItem from './OpenModalMenuItem';
import LoginFormModal from '../LoginForm';
import SignupFormModal from '../SignupForm';
import { useUser } from "@/context/User";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';
import { rerender } from "@react-aria/ssr";

function ProfileButton({ user }) {
  const [showMenu, setShowMenu] = useState(false);
  const ulRef = useRef();
  const { setCurrentUser } = useUser();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = event => {
      if (!ulRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = event => {
    event.preventDefault();
    setCurrentUser(null);
    closeMenu();
  };

  const ulClassName = "profile-dropdown" + (showMenu ? "" : " hidden");

  return (
    <>
      <button onClick={openMenu}>
        {/* <i className="fas fa-user-circle" /> */}
        <FontAwesomeIcon icon={icon({ name: "user-circle", style: "solid" })} />
      </button>
      <ul className={ulClassName} ref={ulRef}>
        {user ? (
          <>
            <li>{user.username}</li>
            <li>{user.firstName} {user.lastName}</li>
            <li>{user.email}</li>
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
            />
            <OpenModalMenuItem
              itemText="Sign Up"
              onItemClick={closeMenu}
              modalComponent={<SignupFormModal />}
            />
          </>
        )}
      </ul>
    </>
  );
}

export default ProfileButton;
