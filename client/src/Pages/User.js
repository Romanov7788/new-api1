import React, { useState, useEffect } from "react";
import api from "../components/api/index";
import { Link } from "react-router-dom";

const User = () => {
  const [users, setUsers] = useState();

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
