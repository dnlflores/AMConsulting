'use client'

import GoogleLoginButton from "@/app/components/GoogleLoginButton";
import GithubLoginButton from "@/app/components/GithubLoginButton";
import styles from '../(auth)/signin/page.module.css';

export default function LogInForm() {

    return (
        <form className="flx-col flx-ctr">
            <div className={styles.upperForm}>
                <div className={styles.inputDiv}>
                    <label>Username/E-mail</label>
                    <input type="text" placeholder="Username/E-mail" />
                </div>
                <div className={styles.inputDiv}>
                    <label>Password</label>
                    <input type="password" />
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