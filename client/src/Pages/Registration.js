import React, {useState} from "react";
import "../App.css";
import Input from '../input';
import {registration} from '../components/user';


const Registration = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


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
          <Input 
          value={password}
          setValue={setPassword}
          type="password" 
          placeholder="Password"
          />
        </center>
        <center>
          <br/>
          <button style={{margin: 20}}
          >  
          LOGIN 
          </button>
          
          <button 
          onClick={() => registration(email, password)}
          >
          Registration
          </button>
        </center>
      </form>
    </div>
)
}

export default Registration;