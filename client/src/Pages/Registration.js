import React, { useState } from "react";
import "../App.css";
import Input from '../input';
import { registration } from '../components/user';
import PWDCheck from "../password";



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
            // setValue={setPassword}
            type="password"
            placeholder="Password"
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyUp={handleKeyUp}
          />
          {/* <Input
            id="password"
            value={password}
            setValue={setPassword}
            type="password"
            placeholder="Password"
            autocomplete="off"
            onChange={handleChange}
            onFocus={handleFocus}
            OnBlur={handleBlur}
            onKeyUp={handleKeyUp}
          /> */}
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