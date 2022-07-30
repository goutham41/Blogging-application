import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import { ToastContainer, toast } from "react-toastify";
import { AuthContext } from "../components/Auth";
const DeleteBlog = () => {
  const { id } = useParams();
  let navigate = useNavigate();
  const { token, setToken, assured, setAssured, id1 } = useContext(AuthContext);
  const [Data, setData] = useState({});
  useEffect(() => {
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/${id}`)
      .then((res) => {
        setData(res.data[0]);
        console.log(res.data[0].userId);
      })
      .catch((err) => err.message);
  }, [id]);

  return (
    <div
      style={{ marginTop: "30px", display: "flex", justifyContent: "center" }}
    >
      <button
        style={{ cursor: "pointer", height: "35px", backgroundColor: "#fff" }}
        onClick={() => {
          axios
            .delete(`https://blogingapp414.herokuapp.com/blogs/${id}/delete`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((res) => {
              axios.delete(`https://blogingapp414.herokuapp.com/users/blog/${Data.userId}`, {
                id: id,
              });
              toast.dismiss();
              toast.error("YOU BLOG IS DELETED");
              navigate("/blogs");
            })
            .catch((err) => err.message);
        }}
      >
        DELETE PERMENENT
      </button>

      <button
        style={{
          cursor: "pointer",
          height: "35px",
          backgroundColor: "#fff",
          marginLeft: "20px",
        }}
        onClick={() => {
          axios
            .delete(`https://blogingapp414.herokuapp.com/blogs/${id}`)
            .then((res) => {
              toast.dismiss();
              toast.error("YOU BLOG GONE TRASH");
              navigate("/blogs");
            })
            .catch((err) =>{
               toast.error(err.response.data.message);
               setTimeout(() => {
                 navigate("/users/login");
                 setAssured(false);
               }, 1000);
            });
        }}
      >
        <MdDelete size="20px" color="#cc0000" />
      </button>
    </div>
  );
};

export default DeleteBlog;
