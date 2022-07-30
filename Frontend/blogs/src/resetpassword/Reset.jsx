import React, { useState,useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
const Reset = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState("");
   const { token, setToken, assured, setAssured, setId, author } =
     useContext(AuthContext);
  return (
    <>
      <div style={{ height: "30px" }}></div>
      <div style={{ width: "40%", margin: "auto" }}>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label for="floatingInput">Email address</label>
        </div>

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="button"
          autocomplete="off"
          style={{ marginTop: "10px", marginLeft: "26.625rem" }}
          onClick={() => {
            axios
              .post(`https://blogingapp414.herokuapp.com/users/reset`, {
                email: value,
              })
              .then((res) => {
                toast.dismiss();
                toast.success("otp has send throught register mailId");
                console.log(res.data);
                setId(res.data.succ._id);
                navigate("/otp");
              })
              .catch((err) => err.message);
          }}
        >
          Get Otp
        </button>
      </div>
    </>
  );
};

export default Reset;
