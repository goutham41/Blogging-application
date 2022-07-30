import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
const Otp = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState(0);
  const { token, setToken, assured, setAssured, id1, author } =
    useContext(AuthContext);
  return (
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
                `https://blogingapp414.herokuapp.com/users/validatereset/${id1}`,
                {
                  otp: value,
                },
              )
              .then((res) => {
                toast.dismiss();
                toast.success("otp has send throught register mailId");
                console.log(res.data);
                setToken(res.data.token);
                navigate("/resetpassword");
              })
              .catch((err) => err.message);
          }}
        >
          send
        </button>
      </div>
    </div>
  );
};

export default Otp;
