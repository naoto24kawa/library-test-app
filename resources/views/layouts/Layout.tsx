import React from 'react'
import NavbarComponent from '../components/NavbarComponent'

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  return (
    <>
      <NavbarComponent user={new Object() as User} />
      <main className="w-100 m-auto">{children}</main>
    </>
  )
}

export default Layout
