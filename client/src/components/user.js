import axios from "axios";
import { url } from "../components/api/index";


export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      `${url}/api/registration`,
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



export const logout = async () => {
  try {
    const response = await axios.post('/logout')
    localStorage.removeItem("token", response.data.token);
    // setUser(response.data.user);
  } catch (e) {
    alert(e.response.data.message);
  }
};



// export const login = async (email, password) => {
//   try {
//     const response = await axios.post(`${url}/api/login`, {
//       email,
//       password,
//     });
//     localStorage.setItem("token", response.data.token);
//     setGetuser(response.data.token);
//     console.log(response.data);
//     return response.data.user;
//   } catch (e) {
//     alert(e.response.data.message);
//   }
// };


// export const auth = async () => {
//       try {
//         const response = await axios.get(`${url}/refresh`,  {withCredentials: true},
//         {headers:{Authorization: `Bearer ${localStorage.setItem('token')}`} })
//     console.log('response.data.user', response.data.user)

//         localStorage.setItem('token', response.data.token)
//       } catch (e) {
//         console.log(e.message)
//         localStorage.removeItem('token')
//       }
      
//     }
  
  
//   export const getUser = async () => {
//     try {
//       const response = await axios.get(
//         `${url}/api/user`, {
//         });
//       console.log("wwww", response.data);
//     } catch (e) {
//       console.error(e)
//     }
//   }