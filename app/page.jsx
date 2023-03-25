import Navigation from '@/components/Navigation';
import styles from './page.module.css';
import prisma from '@/lib/prisma';

export default async function Home() {
  const users = await prisma.user.findMany();

  return (
    <>
      <Navigation />
      <main className={styles.main}>
        {users.map(user => (
          <div key={user.id}>
            <h2>{user.firstName}</h2>
            <h2>{user.lastName}</h2>
            <h3>{user.username}</h3>
          </div>
        ))}
      </main>
    </>
  )
}
