
import React, { useState, useContext} from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logout from "../auth/Logout"
import { AuthContext } from '../auth/AuthProvider'


const NavBar = () => {
  const [showAccount, setShowAccount] = useState(false);
  const { user, isLoggedIn } = useContext(AuthContext);
  const { role } = useContext(AuthContext);

  const handleAccountClick = () => {
    setShowAccount(!showAccount);
  };

  const userRole = user ? user.scope : null;

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
      <div className='container-fluid'>
        <Link to={"/"}>
          <span className='navbar-brand'>Optical Telephone Company</span>
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbar-scroll'
          aria-controls='#navbar-scroll'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toogler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-scroll'>
            {isLoggedIn() && role === "ADMIN" && (
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to={'/admin'}>
                  Admin
                </NavLink>
              </li>
            )}
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                href='#'
                role='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                onClick={handleAccountClick}>
                {" "}
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown">
                <li>
                  <Link className='dropdown-item' to={'/user-calls'} >
                    Call history
                  </Link>
                </li>
                <li>
                  <Link className='dropdown-item' to={'/make-call'} >
                    Make A Call
                  </Link>
                </li>
                {isLoggedIn() ? (
                  <Logout />
                ) : (
                  <li>
                    <Link className='dropdown-item' to={'/login'} >
                      Login
                    </Link>
                  </li>

                )}

              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;

/*

function NavBar() {
  const [showAccount, setShowAccount] = useState(false)
  const { user } = useContext(AuthContext)

  const handleAccountClick = () => {
    setShowAccount(!showAccount)
  }

  const { isLoggedIn } = useContext(AuthContext)

  //track if user is loggedIn
  //const isLoggedIn = user !== null
  const userRole = localStorage.getItem("userRole")

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary px-5 shadow mt-5 sticky-top'>
      <div className='container-fluid'>
        <Link to={"/"}>
          <span className='navbar-brand'>Optical Telephone Company</span>
        </Link>
        <button 
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbar-scroll'
          aria-controls='#navbar-scroll'
          aria-expanded='false'
          aria-label='Toggle navigation'>
            <span className='navbar-toogler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarScroll'>
          <ul className='navbar-nav me-auto my-2 my-lg-0 navbar-scroll'>
            {isLoggedIn() && userRole === "ADMIN" && (
              <li className='nav-item'>
                <NavLink className='nav-link' aria-current='page' to={'/admin'}>
                Admin
                </NavLink>
              </li>
              )}
          </ul>
          <ul className='d-flex navbar-nav'>
            <li className='nav-item dropdown'>
              <a
                className={`nav-link dropdown-toggle ${showAccount ? "show" : ""}`}
                href='#'
                roel='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'
                onClick={handleAccountClick}>
                {" "}
                Account
              </a>
              <ul
                className={`dropdown-menu ${showAccount ? "show" : ""}`}
                aria-labelledby="navbarDropdown">
               <li>
                   <Link className='dropdown-item' to={'/user-calls'} >
                    Call history
                  </Link>
                </li>
                <li>
                   <Link className='dropdown-item' to={'/make-call'} >
                    Make A Call
                  </Link>
                </li>
              {isLoggedIn() ? (
                  <Logout />
              ) : (
                <li>
                   <Link className='dropdown-item' to={'/login'} >
                    Login
                  </Link>
                </li>
             
                )}
               
            </ul>
            </li>
            </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
*/