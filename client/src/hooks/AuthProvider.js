import { createContext, useState } from "react";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [auth, setAuth] = useState({});


    const signin = (user, cb) => {
        setUser(user);
        cb();
    }
    // const signout = (cb) => {
    //     setUser(null);
    //     cb();
    // }

    const value = { user, signin, auth, setAuth };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}