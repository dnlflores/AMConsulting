'use client'

import Link from 'next/link'
import ProfileButton from './ProfileButton';
import { useUser } from '@/context/User';
import './Navigation.css';

function Navigation() {
  const { currentUser } = useUser();

  console.log("current user => ", currentUser);

  return (
    <div>
      <Link href="/">Home</Link>
      <ProfileButton user={currentUser} />
    </div>
  );
}

export default Navigation;