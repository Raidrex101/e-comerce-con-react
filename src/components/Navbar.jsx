
import SearchBar from "./SearchBar"

const navbar = () => {
  return (
    <>


       <nav className="navbar navbar-expand-sm bg-body-secondary">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      REACTMAZON
    </a>
    <SearchBar/>
      <ul className="navbar-nav nav-justified" style={{width: "24%"}}>
        <li className="nav-item">
          <a className="nav-link" aria-current="page" href="#">
            Home
          </a>
        </li>
        <li className="nav-item ">
          <a className="nav-link" href="#">
          Cart🛒
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Login
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">
            Singup
          </a>
        </li>
      </ul>
    </div>
</nav>

    </>
  )
}

export default navbar

 