import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import Input from "../input";
import api from "../components/api/index";
import { useAuth } from "../hooks/useAuth";




const Login = () => {

  const [user, setUser] = useState();
  console.log('user', user);
  const navigate = useNavigate();
  const location = useLocation();
  const {signin} = useAuth();
  const from = location.state?.from?.pathname || "/api/user";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.accessToken)
      const user = response.data.user
      setUser(response.data)
      signin(user, () => navigate(from), {replace: true});
      console.log('login', response.data.user);
      return user;
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  
  const  handleSubmit = (event) => {
    event.preventDefault();
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