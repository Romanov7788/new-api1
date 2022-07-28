import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { AuthContext } from "./hooks/AuthProvider";

export default function Navbar() {
  const { user, dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: "Logout" });
  };

  return (
    <nav className="nav">
      <a href="/" className="stile-title">
        Romanov
      </a>
      <ul>
        <li>
          {user ? (
            <Link to="/api/user">{user.email}</Link>
          ) : (
            <Link to="/api/login">Sing in</Link>
          )}
        </li>
        <li>
          {user ? (
            <li onClick={handleLogout}>Logout</li>
          ) : (
            <Link to="/api/registration">Sing up</Link>
          )}
        </li>
        <li>
          <Link to="/api/users">Users</Link>
        </li>
      </ul>
    </nav>
  )
}