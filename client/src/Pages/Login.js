import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router";
import "../App.css";
import Input from "../input";
import axios from "axios";
import { url } from "../components/api/index";
import { useAuth } from "../hooks/useAuth";




const Login = () => {
  
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {signin} = useAuth();
  const from = location.state?.from?.pathname || "/api/users";
 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    try {
      const response = await axios.post(`${url}/api/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.accessToken)
      setUser(response.data.user);
      console.log('response', response.data.accessToken);
      return user;
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  
  const  handleSubmit = (event) => {
    event.preventDefault();
  const user = email;
  signin(user, () => navigate(from), {replace: true});
  }
  
  return (
    <div className="home">
      <form onSubmit={handleSubmit}>
        <center>
          <Input
            name="email"
            value={email}
            setValue={setEmail}
            type="text"
            placeholder="Email"
          />
          <Input
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Password"
          />
        </center>
        <center>
          <br />
          <button type="submit" onClick={() => login(email, password)}>
            Log in
          </button>
        </center>
      </form>
    </div>
  );
};

export default Login;