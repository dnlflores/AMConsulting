'use client'

import { useState, useEffect } from 'react';
import GoogleLoginButton from "@/app/components/GoogleLoginButton";
import GithubLoginButton from "@/app/components/GithubLoginButton";
import styles from '../(auth)/signin/page.module.css';


export default function SignUpForm() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [image, setImage] = useState("");
    const [password, setPassword] = useState("");
    const [confPass, setConfPass] = useState("");
    const [errors, setErrors] = useState({});

    useEffect(() => {
        const formErrors = {};

        if (firstName.length < 3) formErrors.firstName = "First Name needs to be at least 3 characters long.";
        if (firstName.length > 20) formErrors.firstName = "First Name cannot be greater than 20 characters long.";
        if (lastName.length < 3) formErrors.lastName = "Last Name needs to be at least 3 characters long.";
        if (lastName.length > 20) formErrors.lastName = "Last Name cannot be greater than 20 characters long.";
        if (username.length < 5) formErrors.username = "Username needs to be at least 5 characters long.";
        if (!image.endsWith(".png") && !image.endsWith(".jpg") && !image.endsWith(".jpeg")) errors.image = "Profile Picture must end with .png, .jpg, or .jpeg.";
        if (password !== confPass) errors.confPass = "Passwords do not match.";

        setErrors(formErrors);
    }, [firstName, lastName, username, image, password, confPass]);

    const handleSubmit = async event => {
        event.preventDefault();

        if (Object.values(errors).length) return alert("There are some errors build better messaging later.")


        const res = await fetch("/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: `${firstName} ${lastName}`,
                username,
                email,
                image,
                password
            })
        });

        if (res.ok) {
            const newUser = await res.json();
            setCurrentUser(newUser);
            closeModal();
        }
    };

    return (
        <form className="flx-col flx-ctr">
            <div className={styles.upperForm}>
                <div className={styles.inputDiv}>
                    <label>Username</label>
                    <input type="text" placeholder="Username/E-mail" />
                </div>
                <div className={styles.inputDiv}>
                    <label>E-mail</label>
                    <input type="text" />
                </div>
                <div className={styles.inputDiv}>
                    <label>Name</label>
                    <input type="text" />
                </div>
                <div className={styles.inputDiv}>
                    <label>Password</label>
                    <input type="text" />
                </div>
                <div className={styles.inputDiv}>
                    <label>Confirm Password</label>
                    <input type="text" />
                </div>
                <div className={styles.inputDiv}>
                    <label>Profile Picture</label>
                    <input type="text" />
                </div>
                <button className={styles.signupButton} type="submit">Log In</button>
            </div>
            <div className={styles.lowerForm}>
                <GoogleLoginButton />
                <GithubLoginButton />
            </div>
        </form>
    )
}