'use client'

import { useState } from 'react';
import { useUser } from '@/context/User';
import { useModal } from '@/context/Modal';

export default function SignUpForm() {
    const [credential, setCredential] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { setCurrentUser } = useUser();
    const { closeModal } = useModal();

    const handleSubmit = async event => {
        event.preventDefault();

        try {
            const res = await fetch("/api/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    credential,
                    password
                })
            });

            if (res.ok) {
                const loggedUser = await res.json();
                setCurrentUser(loggedUser);
                closeModal();
            }
        } catch (error) {
            setErrors({ credentials: error.message });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <p className="errors">{errors.credentials}</p>
            <div>
                <label>Credential</label>
                <input value={credential} onChange={e => setCredential(e.target.value)} type="text" />
            </div>
            <div>
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
            </div>
            <button type="submit">Log In</button>
        </form>
    )
}