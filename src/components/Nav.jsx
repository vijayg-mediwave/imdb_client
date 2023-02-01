import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

import StateContext from "../contexts/StateContext";
import DispatchContext from "../contexts/DispatchContext";

const Nav = () => {
  const navigate = useNavigate();
  const appState = useContext(StateContext);
  const appDispatch = useContext(DispatchContext);

  const handleLogout = () => {
    appDispatch({ type: "logout" });
    navigate("/");
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">
            <strong>mymdb</strong>
          </Link>
        </li>
      </ul>
      <ul>
        {appState.isLoggedIn ? (
          <>
            <li>
              <Link to="/add-movie">Add movie</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Nav;
