import axios from "axios";
import { setUser } from "../reducers/userReducer";
import { url } from "../components/api/index";
import { setGetuser } from "react";


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

export const login = (email, password) => {
  return async dispatch => {
        try {
            const response = await axios.post(`${url}/api/login`, {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
            setGetuser(response.data.token);
          return (
            response.data.user
          )
          } catch (e) {
          alert(e.response.data.message)
        }

    }
}
export const auth = () => {
    return async dispatch => {
      try {
        const response = await axios.get(`${url}/refresh`, 
        {headers:{Authorization: `Bearer ${localStorage.setItem('token')}`} })
    console.log('response.data.user', response.data.user)

        dispatch(setUser(response.data.user))
        localStorage.setItem('token', response.data.token)
      } catch (e) {
        console.log(e.message)
        localStorage.removeItem('token')
      }
      
    }
  }
  
  export const getUser = async () => {
    return async dispatch => {
    try {
      const response = await axios.get(
        `${url}/api/user`, {
        });
      console.log("wwww", response.data);
    } catch (e) {
      console.error(e)
    }
  }
}