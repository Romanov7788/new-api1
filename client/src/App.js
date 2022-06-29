import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import User from "./Pages/User";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "./navbar";
import { useEffect } from "react";
import { auth } from './components/user';


function App() {
  const isAuth = useSelector((state) => state.user.isAuth);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(auth())
    console.log(dispatch(auth())
    )
  }, [dispatch])


  return (
    <Router>
      <Navbar />
      <Routes>
        {!isAuth && <Route path="/" element={<Home />} />}
        {!isAuth && <Route path="/api/registration" element={<Registration />} />}
        {!isAuth && <Route path="/api/login" element={<Login />} />}
        {isAuth && <Route path="/api/login" element={<User />} />}
        {isAuth && <Route path="/api/user" element={<User />} />}
      </Routes>
    </Router>
  );
}

export default App;
