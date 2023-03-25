import UserProvider from '@/context/User';
import { ModalProvider, Modal } from '@/context/Modal';
import './globals.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.js. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <ModalProvider>
          <UserProvider>
            <Modal />
            {children}
          </UserProvider>
        </ModalProvider>
      </body>
    </html>
  )
}
