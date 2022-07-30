import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { AuthContext } from "../components/Auth";
const Edit = () => {
  let navigate = useNavigate();
   const { token, setToken, assured, setAssured, id1 } =useContext(AuthContext);
  const { id } = useParams();
  const [value, setValue] = useState("");
  const [content, setContent] = useState("");
  useEffect(() => {
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/${id}`)
      .then((res) => {
        setValue(res.data[0].Title);
        setContent(res.data[0].Content);
      })
      .catch((err) => {
         toast.error(err.response.data.message);
         setTimeout(() => {
           navigate("/users/login");
           setAssured(false);
         }, 1000);
      });

    // {headers: {
    //   Authorization: token ? `Token ${token}` : "",
    // }}
  }, [id]);

  const [count, setCount] = useState(0);
  const [one, setOne] = useState(0);
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
      toast.error("You characters Should be lessthan 300 characters");
    }
    setOne(content.length);
  }, [content]);

  return (
    <>
      <div style={{ height: "60px" }}></div>
      <h3 class="font-monospace" style={{textAlign:"center"}}>UPDATE YOUR BLOG</h3>
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
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="button"
          autocomplete="off"
          style={{ marginTop: "10px", marginLeft: "46.625rem" }}
          onClick={() => {
            axios
              .put(
                `https://blogingapp414.herokuapp.com/blogs/${id}`,
                {
                  Content: content,
                  Title: value,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                },
              )
              .then((res) => {
                toast.dismiss();
                toast.success("You Blog is updated");
                navigate("/blogs");
              })
              .catch((err) => {
                 toast.error(err.response.data.message);
                 setTimeout(() => {
                   navigate("/users/login");
                   setAssured(false);
                 }, 1000);
              });
          }}
        >
         Update
        </button>
      </div>
    </>
  );
};

export default Edit;
