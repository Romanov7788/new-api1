import axios from "axios";
import { setUser } from "../reducers/userReducer";

export const registration = async (email, password) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/registration",
      {
        email,
        password,
      }
    );
    console.log("AAAA", response);
  } catch (e) {
    alert(e.response.data.message);
  }
};

export const login = (email, password) => {
    return async dispatch => {
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email,
                password
            })
            dispatch(setUser(response.data.user))
            localStorage.setItem('token', response.data.token)
        } catch (e) {
            alert(e.response.data.message)
        }

    }
}
