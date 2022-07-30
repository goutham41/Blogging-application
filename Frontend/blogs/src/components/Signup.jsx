import React, { useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "./Auth";
const Signup = () => {
      let navigate = useNavigate();
     
      const { token, setToken, assured, setAssured, setId, author } =
        useContext(AuthContext);
  const [value, setValue] = useState("");
  const [Email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  return (
    <>
      <h1 style={{ textAlign: "center", color: "GrayText" }}>
        Create an account{" "}
      </h1>

      <div style={{ width: "40%", margin: "auto", marginTop: "30px" }}>
        <div class="form-floating mb-3">
          <input
            type="text"
            class="form-control"
            id="floatingInput"
            placeholder="User Name"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label for="floatingInput">User Name</label>
        </div>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label for="floatingInput">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
          <label for="floatingPassword">Password</label>
        </div>
        <button
          class="btn btn-primary"
          type="submit"
          style={{
            width: "200px",
            marginTop: "20px",
            padding: "12px",
            marginLeft: "180px",
          }}
          onClick={() => {
            axios
              .post(`https://blogingapp414.herokuapp.com/users/signup/otp`, {
                UserName: value,
                email: Email,
                password: pass,
              })
              .then((res) => {
                toast.dismiss();
                toast.success("otp has send throught register mailId");
                console.log(res.data);
                setId(res.data.id);
                navigate("/signup/otp");
              })
              .catch((err) => err.message);
          }}
        >
          signup
        </button>
      </div>
    </>
  );
};

export default Signup;
