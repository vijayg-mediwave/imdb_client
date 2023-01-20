import React from "react";
import { Link } from "react-router-dom";

const Nav = () => {
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
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>

        <li>
          <Link to="/add-movie">Add movie</Link>
        </li>
        <li>
          <button>Logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
