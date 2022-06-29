import React from "react";
import 'materialize-css'




const Error = () => {


  return ( 
    <div>
        <center>
      <h1> Home Page </h1>
      <a className="waves-effect waves-light btn" href="/api/login" style={{margin: 20}}>Sing in</a>
      <a className="waves-effect waves-light btn" href="/api/registration">Sing up</a>
      </center>
    </div>
)
}

export default Error;