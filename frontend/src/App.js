import AdminDashboard from './admin/AdminDashboard';
import BlogsList from './admin/BlogList';
import CreateBlog from './admin/CreateBlog';
import './App.css';
import Authpage from './auth/Authpage';
import Homepage from './UI/Homepage';
import {  Routes, Route } from "react-router-dom";

function App() {
  const isLoggedIn = window.localStorage.getItem("loggedIn");

  return (
    <>
   <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/auth" element={<Authpage />} />
    <Route path="/admin" element={<AdminDashboard />} />
    <Route path="/create" element={<CreateBlog />} />
    <Route path="/list" element={<BlogsList />} />



    </Routes> 

     
    </>
  );
}

export default App;
