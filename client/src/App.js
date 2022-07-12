import "./App.css";
import Registration from "./Pages/Registration";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import User from "./Pages/User";
import Error from "./Pages/Error";
import AboutUser from "./Pages/AboutUser";
import Navbar from "./navbar";
import { Routes, Route } from "react-router-dom";
import { RequireAuth } from "./hooks/RequireAuth";
import { AuthProvider } from "./hooks/AuthProvider";



function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
         <Route path="/api/registration" element={<Registration />} />
         <Route path="/api/login" element={<Login />} />


         <Route path="/" element={<Home />} />

         <Route path="/api/users" element={
         <RequireAuth>
         <User />
         </RequireAuth>
        } />
         <Route path="/api/users/:id" element={
          <RequireAuth>
         <AboutUser />
         </RequireAuth>
        } />
         
         <Route path="*" element={<Error />} />

      </Routes>
      </AuthProvider>
  );
}

export default App; 