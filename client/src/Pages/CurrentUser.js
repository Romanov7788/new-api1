import axios from "axios";
import { url } from "../components/api/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CurrentUser = () => {
  const [users, setUsers] = useState();
  console.log('users', users);
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


  return (
    <section>
      <h1> Current User </h1>
      <br />
      <a href="/api/users">
        <button> All Users (Admin) </button>
      </a>
      <button onClick={() => logout()}>log out</button>
    </section>
  );
};
export default CurrentUser;
