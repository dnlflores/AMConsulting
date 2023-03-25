'use client'

import { useState, useContext, createContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export default function UserProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </UserContext.Provider>
    )
}