import LoginBtn from './components/login-btn';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <LoginBtn />
    </main>
  )
}
