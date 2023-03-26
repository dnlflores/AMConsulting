'use client'

import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import styles from "../(auth)/signin/page.module.css";

export default function LogInButton() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false)

  if (session) {
    return (
      <>
        <img onClick={() => setShowMenu(!showMenu)} className={styles.profileImg} src={session.user.image} alt="logged-in-user" />
        {showMenu && (
          <div className={styles.profileDropDown}>
            <p>Signed in as</p>
            <p className={styles.email} title={session.user.name}>{session.user.name}</p>
            <p>Email:</p>
            <p className={styles.email} title={session.user.email}>{session.user.email}</p>
            <button onClick={() => signOut()}>Sign out</button>
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