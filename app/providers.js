'use client'

import { SessionProvider } from 'next-auth/react';
import UserProvider from '@/context/User';
import { ModalProvider } from '@/context/Modal';

export default function Providers({ children }) {

    return (
        <UserProvider>
            <SessionProvider>
                {children}
            </SessionProvider>
        </UserProvider>
    )
}