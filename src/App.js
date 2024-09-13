import { Routes, Route } from "react-router-dom";
// import { Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import "bootstrap/dist/css/bootstrap.css";
import "./styles.css";
import SignIn from "./components/SignIn";
import Register from "./components/Register";
import Profile from "./pages/Profile";
import Community from "./pages/Community"
import { useState } from "react";

function App() {
  const [name, setName] = useState("");
  return (
    <Routes>
      <Route path="/" element={<Layout name={name} />}>
        <Route path="" element={<Home />} />
        <Route path="register" element={<Register />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="community" element={<Community/>} />
        <Route path="profile" element={<Profile/>}/>
        {/* <Route
          path="profile"
          element={
            localStorage.getItem("authToken") ? (
              <Profile setName={setName} />
            ) : (
              <Navigate to="/signin" />
            )
          }
        />*/}
      </Route> 
    </Routes>
  );
}

export default App;
