import axios from "axios";
import api from "../components/api/index";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const CurrentUser = () => {
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


  async function CurrentUser() {
    try {
      const data ={accessToken: localStorage.getItem("token")};
      console.log("data", data);
      await api.get("/user", data)
      .then((response) => setUsers(response.data));
    } catch (err) {
      console.error(err);
    }
  }
  
  useEffect(() => {
    CurrentUser();
  }, []);



  return users ? (
    <section>
      <h3> Email - {users.user.email}</h3>
      <h3> Role - {users.user.roles}</h3>
      <br />
      <a href="/api/users">
        <button> All Users (Admin) </button>
      </a>
      <br />
      <button onClick={() => logout()}>log out</button>
    </section>
  ) : null;
};
export default CurrentUser;
