// import React, {useState} from "react";
// import "../App.css";
// import Input from '../input';
// import {login} from '../hooks/user';
// import {useDispatch} from "react-redux"; 


// const Login = () => {
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
  
//   const dispatch = useDispatch()


//   return ( 
//     <div className="home">
//       <form>
//         <center>
//           <Input 
//           value={email}
//           setValue={setEmail}
//           type="text" 
//           placeholder="Email"
//           />
//           <Input 
//           value={password}
//           setValue={setPassword}
//           type="password" 
//           placeholder="Password"
//           />
//         </center>
//         <center>
//           <br/>
//           <button style={{margin: 20}}
//           onClick={() => dispatch(login(email, password))}
//           >  
//           Sing In 
//           </button>
//         </center>
//       </form>
//     </div>
// )
// }

// export default Login;