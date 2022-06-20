import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Registration from "./Pages/Registration";
// import Login from "./Pages/Login";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "./reducers/userReducer";


function App() {

  // const isAuth = useSelector(state => state.user.isAuth)
  // const dispatch = useDispatch()

  return (
    <Router>
      {/* <nav>
      <div className="navbar">
            <div className="conteiner">
                <div className="navbar__header"> Romanov API</div>
                {!isAuth && <div className="navbar__login"><Link to="/api/login">Login</Link></div>}
                {!isAuth && <div className="navbar__registration"><Link to="/api/registration">Sing Up</Link></div>}
                {isAuth && <div className="navbar__login" onClick={() => dispatch(logout()) }>Exit</div>}
            </div>
        </div>
      </nav> */}
      {/* {!isAuth && */}
      <Routes>
        <Route path="/" element={<Registration />} />
        {/* <Route path="/api/login" element={<Login />} /> */}
        {/* <Route path="/profile/:username" element={<Profile />} /> */}
        {/* <Route path="*" element={<ErrorPage />} /> */}
      </Routes>
      {/* } */}
      <div> Foooter </div>
    </Router>
  );
}

export default App;