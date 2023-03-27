'use client'

import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useEffect, useRef } from 'react';
import styles from "../(auth)/signin/page.module.css";

export default function LogInButton() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);
  const divRef = useRef();

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (!divRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = () => {
    signOut();
    setShowMenu(false);
  };

  if (session) {
    return (
      <>
        <img onClick={openMenu} className={styles.profileImg} src={session.user.image} alt="logged-in-user" />
        {showMenu && (
          <div className={styles.profileDropDown} ref={divRef}>
            <p>Signed in as</p>
            <p className={styles.email} title={session.user.name}>{session.user.name}</p>
            <p>Email:</p>
            <p className={styles.email} title={session.user.email}>{session.user.email}</p>
            <button onClick={logout}>Sign out</button>
          </div>
        )}
      </>
    )
  }
  return (
    <div>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}