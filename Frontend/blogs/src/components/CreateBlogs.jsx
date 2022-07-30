import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styles from "../styles/CreateBlog.module.css";
import { useEffect } from "react";
import { AuthContext } from "./Auth";
const CreateBlogs = () => {
  const { token, setToken, assured, setAssured, id1, author } =
    useContext(AuthContext);
  let navigate = useNavigate();
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  const [count, setCount] = useState(0);
  const [one, setOne] = useState(0);
  const [Category, setCategory] = useState("");

  const [data, setData] = useState([]);
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

  useEffect(() => {
    axios
      .get(`https://blogingapp414.herokuapp.com/users`)
      .then((res) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => err.message);
  }, []);

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <h3 class="font-monospace" style={{textAlign:"center"}}>CREATE YOUR BLOG</h3>
      <div style={{ width: "60%", margin: "auto" }}>
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <label for="floatingInput">Title</label>
        </div>
        <div class="form-floating">
          <textarea
            class="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "200px" }}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          ></textarea>
          <label for="floatingTextarea2">Content</label>
        </div>
        <div class="form-floating" style={{ marginTop: "10px" }}>
          <select
            class="form-select"
            id="floatingSelectGrid"
            aria-label="Floating label select example"
            value={Category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option selected >Open this select Categories</option>
            <option value="Movie">Movie</option>
            <option value="Books">Books</option>
            <option value="Finance">Finance</option>
            <option value="StockNote">StockNote</option>
          </select>
          <label for="floatingSelectGrid">Categories</label>
        </div>

        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="button"
          autocomplete="off"
          style={{ marginTop: "10px", marginLeft: "46.625rem" }}
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
                  categories: Category,
                  userId: id1,
                })
                .then((res) => {
                  navigate("/blogs");
                  axios.put(`https://blogingapp414.herokuapp.com/users/blog/${id1}`, {
                    id: res.data._id,
                  });
                  axios.post(`https://blogingapp414.herokuapp.com/likes/`, {
                    likes: 0,
                    blogId: res.data._id,
                  });
                  toast.dismiss();
                  toast.success("BLOG CREATE SUCCESSFULLY");
                })
                .catch((err) => {
                    toast.error(err.response.data.message);
                     setTimeout(() => {
                       navigate("/users/login");
                       setAssured(false);
                     }, 1000);
                });
            } else {
              toast.dismiss();
              toast.error("ERROR DUE TO VALIDATION");
            }
          }}
        >
          Publish
        </button>
      </div>
    </>
  );
};

export default CreateBlogs;
