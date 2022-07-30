import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
const UserCreateBlog = () => {
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [one, setOne] = useState(0);
  const [Category, setCategory] = useState("");
  useEffect(() => {
    if (value.length > 30) {
      toast.dismiss();
      toast.error("You characters Should be lessthan 30 characters");
    }
    setCount(value.length);
  }, [value]);

  useEffect(() => {
    if (content.length > 300) {
      toast.dismiss();
      toast.error("You characters Should be lessthan 300characters");
    }
    setOne(content.length);
  }, [content]);

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <div style={{ marginTop: "100px", width: "40%", margin: "auto" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            border: "1px solid gray",
            padding: "10px 0px",
            borderBottom: "0px",
          }}
        >
          <p>TITLE</p>
          <input
            style={{ width: "198px", marginLeft: "22px" }}
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </div>
        <p
          style={{ marginLeft: "450px", marginTop: "-30px", fontSize: "13px" }}
        >
          {count}/30
        </p>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            border: "1px solid gray",
            padding: "10px 0px",
            borderTop: "0px",
            marginTop: "-22px",
          }}
        >
          <p>CONTENT</p>
          <textarea
            style={{ height: "150px", width: "200px" }}
            type="text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div style={{ marginTop: "-100px", marginLeft: "-330px" }}>
          <select
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Categories</option>
            <option value="62b5c6580ef10fa3b420fd7d">Movie</option>
            <option value="62b5c6640ef10fa3b420fd7e">Books</option>
            <option value="62b5c67b0ef10fa3b420fd7f">Finance</option>
            <option value="62b5c6970ef10fa3b420fd80">StockNote</option>
          </select>
        </div>
        <p
          style={{ marginLeft: "460px", marginTop: "-30px", fontSize: "13px" }}
        >
          {one}/300
        </p>

        <br />

        <div style={{ marginTop: "100px" }}>
          {" "}
          <button
            style={{
              height: "40px",
              width: "130px",
              background: "#00afef",
              borderRadius: "15px",
              border: "0px",
              fontSize: "20px",
              cursor: "pointer",
              color: "#fff",
            }}
            onClick={() => {
              if (
                value.length > 0 &&
                content.length > 0 &&
                content.length <= 300 &&
                value.length <= 30
              ) {
                axios
                  .post(`https://blogingapp414.herokuapp.com/blogs/create`, {
                    Title: value,
                    Content: content,
                    categories: [Category],
                  })
                  .then((res) => {
                    console.log(res);

                    navigate("/blogs");
                    toast.dismiss();
                    toast.success("BLOG CREATE SUCCESSFULLY");
                  })
                  .catch((err) => err.message);
              } else {
                toast.dismiss();
                toast.error("ERROR DUE TO VALIDATION");
              }
            }}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default UserCreateBlog;
