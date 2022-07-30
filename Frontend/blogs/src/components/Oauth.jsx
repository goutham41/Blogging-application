import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
const Oauth = () => {
     const [user, setUser] = useState(null);
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
             setUser(resObject.user);
             console.log(resObject);
           })
           .catch((err) => {
             console.log(err);
           });
       };
       getUser();
     }, []);
  return (
    <div>Oauth</div>
  )
}

export default Oauth