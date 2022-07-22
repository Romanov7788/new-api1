import axios from "axios";
import React, { useState, useEffect } from "react";
import api from "../components/api/index";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  async function logout() {
    try {
      const response = await axios.post("/api/logout");
      localStorage.removeItem("token", response.data.token);
      setUsers(null);
      navigate("/", { replace: true });
    } catch (e) {
      alert(e.response.data.message);
    }
  }

  async function User() {
    try {
      const response = await api.get("/users");
      setUsers(response.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    User();
  }, []);

  return users ? (
    <>
      <h2>All users</h2>
      {users.map((user) => (
        <Link key={user.email} to={`${user._id}`}>
          <li>{user.email}</li>
        </Link>
      ))}
      <br />
      <br />
      <br />
      <button onClick={() => logout()}>log out</button>
    </>
  ) : (
    <p>
      <h2>
        <center>You are not Admin. Please log in and try again</center>
      </h2>
      <center>
        <a href="/api/user">
          <button> Go to Profile </button>
        </a>
      </center>
    </p>
  );
};
export default User;
