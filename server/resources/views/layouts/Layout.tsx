import React from 'react'
import NavbarComponent from '../components/NavbarComponent'
import useLoginUser from '../../js/hooks/useLoginUser'

type Props = {
  children: React.ReactNode
}

const Layout: React.FunctionComponent<Props> = ({ children }) => {
  const [loginUser] = useLoginUser()
  return (
    <>
      <NavbarComponent user={loginUser} />
      <main className="w-100 h-100 m-auto bg-body-tertiary">{children}</main>
    </>
  )
}

export default Layout
