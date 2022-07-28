import { createContext, useState, useReducer, useEffect } from "react";
import Reducer from "../components/reducer";

const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const AuthContext = createContext({ INITIAL_STATE });

export const AuthProvider = ({ children }) => {
  const [users, setUser] = useState({});
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);
  const [auth, setAuth] = useState({});

  const signin = (users, cb) => {
    setUser(users);
    cb();
  };

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  const value = {
    users,
    signin,
    auth,
    setAuth,
    state,
    user: state.user,
    dispatch,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
