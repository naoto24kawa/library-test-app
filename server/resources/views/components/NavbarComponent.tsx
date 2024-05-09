import { Link } from '@inertiajs/react'
import React from 'react'
import 'resources/css/nav.css'

type Props = {
  user: User
}

const NavbarComponent: React.FunctionComponent<Props> = ({ user }) => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-dark"
      aria-label="navbar"
    >
      <div className="container">
        <Link className="navbar-brand" href="/react/books">
          Library
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbar"
          aria-controls="navbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" href="/react/user">
                MyPage
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="/react/books"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Books
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" href={'/react/books/create'}>
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                href="#"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Master
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link
                    className="dropdown-item"
                    href="{{ route('books.create.index') }}"
                  >
                    Register
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Another action
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" href="#">
                    Something else here
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
          <form method="POST" action="{{ route('logout') }}">
            <button type="submit" className="btn btn-outline-secondary">
              {'Log Out'}
            </button>
          </form>
        </div>
      </div>
    </nav>
  )
}

export default NavbarComponent
