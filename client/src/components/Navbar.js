import React from "react";
import { Link, NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to="/" className="brand-logo left">
          InstaPost
        </Link>
        <ul id="nav-mobile" className="right">
          <li>
            <NavLink activeClassName="active" to="/signin">
              Sign In
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/signup">
              Signup
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/profile">
              Profile
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName="active" to="/create">
              Create Post
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
