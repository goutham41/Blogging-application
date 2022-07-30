import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../components/Auth";
const Inputreset = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const { token, setToken, assured, setAssured, id1, author } =
    useContext(AuthContext);
  return (
    <div>
      <div>
        <div style={{ height: "30px" }}></div>
        <div style={{ width: "40%", margin: "auto" }}>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="Enter new password"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <label for="floatingPassword">Enter new password </label>
          </div>
          <div class="form-floating">
            <input
              type="text"
              class="form-control"
              id="floatingPassword"
              placeholder="re-enter new password"
             
            />
            <label for="floatingPassword">re-enter new password</label>
          </div>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="button"
            autocomplete="off"
            style={{ marginTop: "10px", marginLeft: "26.625rem" }}
            onClick={() => {
              axios
                .put(
                  `https://blogingapp414.herokuapp.com/users/reset/${id1}`,
                  {
                    password: value,
                  },
                  {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  },
                )
                .then((res) => {
                  toast.dismiss();
                  toast.success("your password updated ");
                  console.log(res.data);
                  navigate("/users/login");
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

export default Inputreset;
