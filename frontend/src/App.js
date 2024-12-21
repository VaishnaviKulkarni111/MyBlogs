import AdminDashboard from "./admin/AdminDashboard";
import BlogsList from "./admin/BlogList";
import CreateBlog from "./admin/CreateBlog";
import "./App.css";
import Authpage from "./auth/Authpage";
import Homepage from "./UI/Homepage";
import { Routes, Route } from "react-router-dom";
import UserBoard from "./user/UserBoard";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const userType = window.localStorage.getItem("userType");
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/auth" element={<Authpage />} />
        {isLoggedIn === "true" && userType === "admin" && (
          <Route path="/admin" element={<AdminDashboard />} />
        )}
        {isLoggedIn === "true" && userType === "admin" && (
          <Route path="/create" element={<CreateBlog />} />
        )}

        {isLoggedIn === "true" && userType === "admin" && (
          <Route path="/list" element={<BlogsList />} />
        )}

        
        <Route path="/user" element={<UserBoard />} />
      </Routes>
    </>
  );
}

export default App;
