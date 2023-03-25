'use client'

import { useState, useEffect } from 'react';
import { useUser } from '@/context/User';
import { useModal } from '@/context/Modal';

export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [avatar, setAvatar] = useState("");
    const [errors, setErrors] = useState({});
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const { setCurrentUser } = useUser();
    const { closeModal } = useModal();

    useEffect(() => {
        const errors = {};

        if (firstName.length < 3) errors.firstName = "First Name must be at least 3 characters long.";
        if (lastName.length < 3) errors.lastName = "Last Name must be at least 3 characters long.";
        if (username.length < 5) errors.username = "Username must be at least 5 characters long."
        if (password.length < 6) errors.password = "Password must be at least 6 characters long.";
        if (!avatar.endsWith(".png") && !avatar.endsWith(".jpg") && !avatar.endsWith(".jpeg")) errors.avatar = "Avatar must end with .png, .jpg, or .jpeg.";
        if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match.";

        setErrors(errors);
    }, [firstName, lastName, username, password, confirmPassword, avatar]);

    const handleSubmit = async event => {
        event.preventDefault();

        setHasSubmitted(true);

        if (!Object.values(errors).length) {
            try {
                const res = await fetch("/api/users", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        firstName,
                        lastName,
                        username,
                        email,
                        avatar,
                        password
                    })
                });

                if (res.ok) {
                    const newUser = await res.json();
                    setCurrentUser(newUser);
                    closeModal();
                }
            } catch (error) {
                console.log("there was an error => ", error)
                throw new Error(error.message);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <input value={firstName} onChange={e => setFirstName(e.target.value)} type="text" />
                {hasSubmitted && <p className="errors">{errors.firstName}</p>}
            </div>
            <div>
                <label>Last Name</label>
                <input value={lastName} onChange={e => setLastName(e.target.value)} type="text" />
                {hasSubmitted && <p className="errors">{errors.lastName}</p>}
            </div>
            <div>
                <label>Username</label>
                <input value={username} onChange={e => setUsername(e.target.value)} type="text" />
                {hasSubmitted && <p className="errors">{errors.username}</p>}
            </div>
            <div>
                <label>Email</label>
                <input value={email} onChange={e => setEmail(e.target.value)} type="email" />
            </div>
            <div>
                <label>Password</label>
                <input value={password} onChange={e => setPassword(e.target.value)} type="password" />
                {hasSubmitted && <p className="errors">{errors.password}</p>}
            </div>
            <div>
                <label>Confirm Password</label>
                <input value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} type="password" />
                {hasSubmitted && <p className="errors">{errors.confirmPassword}</p>}
            </div>
            <div>
                <label>Avatar</label>
                <input value={avatar} onChange={e => setAvatar(e.target.value)} type="text" />
                {hasSubmitted && <p className="errors">{errors.avatar}</p>}
            </div>
            <button type="submit">Sign Up</button>
        </form>
    )
}