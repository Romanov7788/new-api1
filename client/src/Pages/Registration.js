import React, { useState } from "react";
import "../App.css";
import Input from '../input';
import PWDCheck from "../password";
import api from "../components/api/index";



const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pwdCheck, setPWDCheck] = useState(false);
  const [checks, setChecks] = useState({
    capsLetterCheck: false,
    numberCheck: false,
    pwdLengthCheck: false,
    specialCharCheck: false,
  });

  const handleChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFocus = () => {
    setPWDCheck(true);
  };

  const handleBlur = () => {
    setPWDCheck(false);
  };

  const handleKeyUp = (e) => {
    const { value } = e.target;
    const capsLetterCheck = /[A-Z]/.test(value);
    const numberCheck = /[0-9]/.test(value);
    const pwdLengthCheck = value.length >= 8;
    const specialCharCheck = /[!@#$%^&*]/.test(value);
    setChecks({
      capsLetterCheck,
      numberCheck,
      pwdLengthCheck,
      specialCharCheck
    })
  };

const registration = async (email, password) => {
    try {
      const response = await api.post(
        '/registration',
        {
          email,
          password,
        }
      );
      console.log("Data", response.data.message)
    } catch (e) {
      alert(e.response.data.message)
    }
  };

  return (
    <div className="home">
      <form>
        <center>
          <Input
            value={email}
            setValue={setEmail}
            type="text"
            placeholder="Email"
          />
          <input
            id="password"
            value={password}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
        </center>
        <center>
          <br />
          <button type="button"
            onClick={() => registration(email, password)}
          >
            Sing up
          </button>
        </center>
      </form>
      {pwdCheck ? <PWDCheck
        checks={checks}/> : null}
    </div>

  )
}

export default Registration;