import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Error from "./Pages/error";
import Home from "./Pages/Home";
import { useSelector } from "react-redux";
import Navbar from "./navbar";

function App() {
  const isAuth = useSelector((state) => state.user.isAuth);

  return (
    <Router>
      <Navbar />
      {!isAuth && (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/api/registration" element={<Registration />} />
          <Route path="/api/login" element={<Login />} />
        </Routes>
      )}
        <Routes>
          <Route path="/h" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
