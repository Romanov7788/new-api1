import axios from "axios";
import React, { useState, useEffect } from "react";
import { url } from "../components/api/index";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";



const User = () => {
  
  const {signout} = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState();
  
  const config = {
    headers: {
      Authorization: `Bearer ` + localStorage.getItem('token')
    },
  };
  
  useEffect(() => {
    axios.get(`${url}/api/users`, config)
    .then(res => {
      const userData = res || null;
      setUsers(userData.data);
      console.log("sdfs", userData);
      });
  }, []);

      
      return users ?  (
        <>
      <h2>Hello</h2>
      <button a href="/api/admin" >Admin Page</button>
      <button onClick={() => signout(() => navigate('/', {replace: true}))}>log out</button>
      </>
  ) : null
}
export default User;