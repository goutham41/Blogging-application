import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
const SignOtp = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState(0);
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
    id1
  } = useContext(AuthContext);
  return (
    <div>
      {" "}
      <div>
        <div style={{ height: "30px" }}></div>
        <div style={{ width: "40%", margin: "auto" }}>
          <div class="form-floating">
            <input
              type="otp"
              class="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label for="floatingPassword">Enter Opt </label>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="button"
            autocomplete="off"
            style={{ marginTop: "10px", marginLeft: "26.625rem" }}
            onClick={() => {
              axios
                .post(
                  `https://blogingapp414.herokuapp.com/users/validateotp/${id1}`,
                  {
                    otp: value,
                  },
                )
                .then((response) => {
                  console.log(response.data);
                  setToken(response.data.token);
                  setAssured(true);
                  setId(response.data.succ._id);
                  setAuthor(response.data.succ.UserName);
                  setEmailOne(response.data.succ.email);
                  navigate(`/users/blogs/${response.data.succ._id}`);
                })
                .catch((err) => err.message);
            }}
          >
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignOtp;
