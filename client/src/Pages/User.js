import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../components/api/index";
import { Link, useNavigate } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const response = await axios.post("/api/logout");
      localStorage.removeItem("token", response.data.token);
      setUsers(null);
      navigate("/", {replace: true});
    } catch (e) {
      alert(e.response.data.message);
    }
  };

  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userData = await axios.get(`${url}/api/users`, config);
        setUsers(userData.data);
      } catch (err) {
        console.log("error", err);
      }
    };
    getUsers();
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
      <Link to="/api/user">Back</Link>
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
        <button> Back </button>
      </a>
      </center>
    </p>
  );
};
export default User;
