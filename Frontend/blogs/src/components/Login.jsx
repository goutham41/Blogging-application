import Google from "../img/google.png";
import Facebook from "../img/facebook.png";
import Github from "../img/github.png";
import React, { useState, useContext } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import styled from "styled-components";
import { AuthContext } from "./Auth";
import TextButton from "../ButtonCmp/TextButton";

const Login = () => {
  const [form, setForm] = useState({});
  const {
    token,
    setToken,
    assured,
    setAssured,
    setId,
    author,
    setAuthor,
    emailOne,
    setEmailOne,
    avatar,
    setAvatar,
  } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const google = () => {
    window.open("https://blogingapp414.herokuapp.com/auth/google", "_self");
  };

  const github = () => {
    window.open("https://blogingapp414.herokuapp.com/auth/github", "_self");
  };

  const facebook = () => {
    window.open("https://blogingapp414.herokuapp.com/auth/facebook", "_self");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    axios
      .post("https://blogingapp414.herokuapp.com/users/login", form)
      .then((response) => {
        // console.log(response);
        setToken(response.data.token);
        setAssured(true);
        setId(response.data.user._id);
        setAuthor(response.data.user.UserName);
        setEmailOne(response.data.user.email);
        setAvatar(response.data.user.avatar);
        navigate(`/users/blogs/${response.data.user._id}`);
      })
      .catch((error) => {
        toast.dismiss();
        toast.error("User Not Authorized");
        setAssured(false);
        console.log(error.response);
      });
  };
  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
          <div className="loginButton github" onClick={github}>
            <img src={Github} alt="" className="icon" />
            Github
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right" style={{ marginTop: "-30px" }}>
          <form onSubmit={handleSubmit}>
            <div class="form-floating mb-3">
              <input
                type="email"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name="email"
                onChange={handleChange}
                style={{width:"250px"}}
              />
              <label for="floatingInput">Email address</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <label for="floatingPassword">Password</label>
            </div>

            <button
              class="btn btn-primary"
              type="submit"
              style={{ width: "250px", marginTop: "20px", padding: "12px" }}
            >
              Login
            </button>
          </form>
          <Link to="/reset">
            forgot password ?
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
