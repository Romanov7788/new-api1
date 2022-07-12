import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../components/api/index";
import { Link } from "react-router-dom";

const User = () => {

  const [users, setUsers] = useState();

  const logout = async () => {
    try {
      const response = await axios.post('/api/logout')
      localStorage.removeItem("token", response.data.token);
      setUsers(response.data.token);
    } catch (e) {
      alert(e.response.data.message);
    }
}

  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
  };

  useEffect(() => {
    axios.get(`${url}/api/users`, config).then((res) => {
      const userData = res || null;
      setUsers(userData.data);
      console.log("sdfs", userData);
    });
  }, []);

  return users ? (
    <>
      <h2>All users</h2>
      {users.map((user) => (
        <Link key={user.email} to={`${user._id}`}>
        <li>{user.email}</li></Link>
      ))}
      <br/>
      <br/>
      <button onClick={() => logout()}>
        log out
      </button>
    </>
  ) : <p>
    <h4>
      <center>
      You are not logged in. Please log in and try again
      </center>
      </h4>
    </p>;
};
export default User;
