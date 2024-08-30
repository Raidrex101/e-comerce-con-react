import { useState, useEffect } from "react"
import { NavLink} from "react-router-dom"
import { useAuthContext } from '../../hooks/useAuth'
import { getMyUserService } from "../../services/UserServices"
import PropTypes from "prop-types"
import reactLogo from "../../assets/react.svg"
import "./Navbar.scss"

const Navbar = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState("")
  const { logout, autenticated, userPayload } = useAuthContext()
  const [user, setUser] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token')
        if (token) {
          const response = await getMyUserService(token)
          
          
          setUser(response.data.first_name)
        }
      } catch (error) {
        console.error("Error fetching user data:", error)
      }
    };

    if (autenticated) {
      fetchUserData();
    }
  }, [autenticated]);
  

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase()
    setSearchInput(value)
    setSearchTerm(value)
  }


  

  const linkIsActive = (isActive) => isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  return (
    <>


      <nav className="header" style={{ height: "3.8rem" }}>
        <NavLink to="/" className="header__logo">
          <img src={reactLogo} alt="React Logo" />
        </NavLink>
        <NavLink to="/"
          className="header__logo">
          REACTMAZON
        </NavLink>

        <div className='container-fluid'>
          <input type="search"
            className="form-control" style={{ width: "100%" }}
            placeholder="Search a product"
            value={searchInput}
            onChange={handleSearchChange}
          />
        </div>
        <ul className="header__nav-list" >

          <li className="header__list-item">

            <NavLink
              to="/"
              className={({ isActive }) => linkIsActive(isActive)}>
              Home
            </NavLink>

          </li>

          {autenticated ? (

            <>
              <div className="dropdown text-end">
                <a
                  href="#"
                  className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img
                    src="https://github.com/mdo.png"
                    alt="mdo"
                    width={32}
                    height={32}
                    className="rounded-circle"
                  />
                  <span style={{ marginLeft: "8px" }}>
                  {user}
                </span>
                </a>
                <ul className="dropdown-menu text-small" style={{}}>
                  <li className="header__list-item ">

                    <NavLink
                      to="/cart"
                      className={({ isActive }) => linkIsActive(isActive)}>
                      Cart🛒
                    </NavLink>

                  </li>

                  {userPayload?.role == 'ADMIN' && (
                    <>
                  <hr className="dropdown-divider" />
                    <li className="header__list-item">
                      <NavLink
                        to="/secret"
                        className={({ isActive }) => linkIsActive(isActive)}>
                        Product manager
                      </NavLink>

                    </li>
                    </>
                  )}

                  <li>

                    <hr className="dropdown-divider" />
                    
                  </li>

                  <li className="header__list-item">

                      <NavLink
                        to="/"
                        className="header__item-link"
                        onClick={logout}>
                        Logout
                      </NavLink>

                    </li>
                </ul>
              </div>
            </>
          )

            :

            (
              <>
                <li className="header__list-item">
                  <NavLink
                    to="/singup"
                    className={({ isActive }) => linkIsActive(isActive)}>
                    Signup
                  </NavLink>

                </li>

                <li className="header__list-item">
                  <NavLink
                    to="/login"
                    className={({ isActive }) => linkIsActive(isActive)}>
                    Login
                  </NavLink>

                </li>
              </>
            )
          }

        </ul>
      </nav>

    </>
  )
}
Navbar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired
}

export default Navbar

