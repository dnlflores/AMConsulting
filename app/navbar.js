import LogInButton from "./components/login-btn";
import Link from "next/link";
import styles from './page.module.css';

export default function Navigation() {

    return (
        <nav className={styles.navbar}>
            <Link href="/">Home</Link>
            <LogInButton />
        </nav>
    )
}