import { useState } from "react"
import { NavLink } from "react-router-dom"
import PropTypes from "prop-types"
import reactLogo from "../../assets/react.svg"
import "./Navbar.scss"

const Navbar = ({ setSearchTerm}) => {
  const [searchInput, setSearchInput] = useState("")

  const handleSearchChange = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchInput(value)
    setSearchTerm(value)
  }

  const linkIsActive = (isActive) => isActive ? 'header__item-link header__item-link--is-active' : 'header__item-link'
  return (
    <>


      <nav className="header" style={{ height: "3.8rem" }}>
        <NavLink to="/"
          className="header__logo">
          REACTMAZON {reactLogo}
        </NavLink>

        <div className='container-fluid'>
            <input type="search" 
            className="form-control" style={{width: "100%"}} 
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
          <li className="header__list-item ">

            <NavLink 
            to="/cart"
              className={({ isActive }) => linkIsActive(isActive)}>
              Cart🛒
            </NavLink>

          </li>
          <li className="header__list-item">
            <NavLink 
            to="/login"
              className={({ isActive }) => linkIsActive(isActive)}>
              Login
            </NavLink>
          </li>

          <li className="header__list-item">
            <NavLink
              to="/singup"
              className={({ isActive }) => linkIsActive(isActive)}>
              Singup
            </NavLink>

          </li>
        </ul>
      </nav>

    </>
  )
}
Navbar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired
}

export default Navbar

