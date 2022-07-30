import React, { useEffect, useState, useContext } from "react";
import DefaultButton from "../ButtonCmp/DefaultButton";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "../components/Auth";
import LoadingSpinner from "../styled/Spinner";

const Home = () => {
  const [user, setUser] = useState(null);
  const { token, setToken, assured, setAssured, setId, author, setAuthor } =
    useContext(AuthContext);
  const navigate = useNavigate();
  useEffect(() => {
    const getUser = () => {
      fetch("https://blogingapp414.herokuapp.com/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        },
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has been failed!");
        })
        .then((resObject) => {
          setUser(resObject.user.displayName);
          console.log(resObject);
          let obj = {
            UserName: resObject.user.displayName,
            email: resObject.user.displayName,
            Blogs: [],
            password: resObject.id,
          };
          axios.post("https://blogingapp414.herokuapp.com/users/create", obj);
          
          axios
            .get(
              `https://blogingapp414.herokuapp.com/users/userName/${resObject.user.username}`,
            )
            .then((response) => {
              console.log(response);
              setToken(response.data.token);
              setAssured(true);
              setId(response.data.user._id);
              setAuthor(response.data.user.UserName);
              navigate(`/users/blogs/${response.data.user._id}`);
            })
            .catch((error) => {
              toast.dismiss();
              // toast.error("User Not Authorized");
              setAssured(false);
              console.log(error.response);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

setTimeout(() => {
   axios
     .get(`https://blogingapp414.herokuapp.com/users/userName/${user}`)
     .then((response) => {
       console.log(response);
       setToken(response.data.token);
       setAssured(true);
       setId(response.data.user._id);
       setAuthor(response.data.user.UserName);
       navigate(`/users/blogs/${response.data.user._id}`);
     })
     .catch((error) => {
       toast.dismiss();
       //  toast.error("User Not Authorized");
       setAssured(false);
       console.log(error.response);
     });
}, 2000);
 
  return (
    <div>
      <LoadingSpinner />
    </div>
  );
};

export default Home;
