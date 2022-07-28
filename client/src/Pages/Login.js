import React, { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../App.css";
import Input from "../input";
import api from "../components/api/index";
import { useAuth } from "../hooks/useAuth";
import { AuthContext } from "../hooks/AuthProvider"




const Login = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {signin} = useAuth();
  const from = location.state?.from?.pathname || "/api/users";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useContext(AuthContext)  

  const login = async (email, password) => {
    try {
      const response = await api.post('/login', {
        email,
        password,
      });
      dispatch({type:"Login_Success", payload: response.data});
      const user = response.data.email
      signin(user, () => navigate(from), {replace: true});
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