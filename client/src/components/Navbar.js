import React, { useContext } from "react";
import { Link, NavLink, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const NavBar = () => {
  const { state, dispatch } = useContext(UserContext);
  const history = useHistory();
  const signOut = () => {
    localStorage.clear();
    dispatch({type: 'CLEAR'})
    history.push('/signin')
  }

  const renderList = () => {
    if (state) {
      return [
        <li>
          <NavLink activeClassName="active" to="/myfollowingpost">
            My Following Posts
          </NavLink>
        </li>,
        <li>
          <NavLink activeClassName="active" to="/profile">
            Profile
          </NavLink>
        </li>,
        <li>
          <NavLink activeClassName="active" to="/create">
            Create Post
          </NavLink>
        </li>,
        <li>
        <button
          className="btn waves-effect waves-light blue darken-1"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </li>
      ];
    } else {
      return [
        <li>
          <NavLink activeClassName="active" to="/signin">
            Sign In
          </NavLink>
        </li>,
        <li>
          <NavLink activeClassName="active" to="/signup">
            Signup
          </NavLink>
        </li>,
      ];
    }
  };

  return (
    <nav>
      <div className="nav-wrapper white">
        <Link to={state ? "/": '/signin'} className="brand-logo left">
          InstaPost
        </Link>
        <ul id="nav-mobile" className="right">
          {renderList()}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
