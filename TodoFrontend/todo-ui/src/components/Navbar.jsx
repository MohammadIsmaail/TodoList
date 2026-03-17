import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
const Navbar = () => {
  const [token, setToken] = useState("");
  const navigation = useNavigate()
  const location=useLocation()

  useEffect(() => {
    const data = localStorage.getItem("token");
    setToken(data);
  }, [location.pathname]);
  // console.log(token, "$$$$$$$$$$$$$$$$$$$");

 const handleLogout = () => {
  localStorage.removeItem("token");
  setToken("");
  navigation("/");
};

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <a className="navbar-brand fs-5" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            {!token ? (
              <>
                <li className="nav-item active">
                  <Link className="nav-link " to="/">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/register">
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item active">
                  <Link className="nav-link " to="/create">
                    create
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link " to="/view">
                    view
                  </Link>
                </li>
                {/* <li className="nav-item active">
                  <Link className="nav-link " to="/edit">
                    edit
                  </Link>
                </li> */}
                <li className="nav-item">
                  <button
                    className="btn btn-danger nav-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
