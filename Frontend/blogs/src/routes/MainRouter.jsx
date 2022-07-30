import React from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Blogs from "../components/Blogs";
import CreateBlogs from "../components/CreateBlogs";
import DeletedBlogs from "../components/DeletedBlogs";
import Header from "../components/Header";
import LoginForm from "../components/Login";
import Navbar from "../components/Navbar";
import Signup from "../components/Signup";
import UserBlogs from "../components/UserBlogs";
import UserCreateBlog from "../components/UserCreateBlog";
import Content from "../content/Content";
import DeleteBlog from "../Deleted/DeleteBlog";
import Edit from "../Edit/Edit";
import Home from "../Home/Home";
import Inputreset from "../resetpassword/Inputreset";
import Otp from "../resetpassword/Otp";
import Reset from "../resetpassword/Reset";
import SignOtp from "../resetpassword/SignOtp";

const MainRouter = () => {
  return (
    <>
      {/* <Navbar /> */}
      <Header />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/blogs/create" element={<CreateBlogs />} />
        <Route path="/blogs/create/:id" element={<UserCreateBlog />} />
        <Route path="/blogs/trash" element={<DeletedBlogs />} />
        <Route path="/blogs/:id" element={<Content />} />
        <Route path="/blogs/:id/delete" element={<DeleteBlog />} />
        <Route path="/blogs/:id/edit" element={<Edit />} />
        <Route path="/users/login" element={<LoginForm />} />
        <Route path="/users/blogs/:id" element={<UserBlogs />} />
        <Route path="/reset" element={<Reset />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/resetpassword" element={<Inputreset />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signup/otp" element={<SignOtp />} />
      </Routes>
    </>
  );
};

export default MainRouter;
