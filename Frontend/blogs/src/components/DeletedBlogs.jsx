import React, { useState, useEffect ,useContext} from "react";
import axios from "axios";
import styles from "../styles/Blog.module.css";
import { useNavigate } from "react-router-dom";
import {toast } from "react-toastify";
import { MdArrowForward } from "react-icons/md";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { MdOutlineRestore } from "react-icons/md";
import styled from "styled-components";
import LoadingSpinner from "../styled/Spinner";
import { AuthContext } from "./Auth";

const DeletedBlogs = () => {
     const { token, setToken, assured, setAssured, id1, author } =useContext(AuthContext);
   let navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/trash/${id1}`)
      .then((res) => {
        let arr = res.data.filter((elem) => elem.Deleted === true);
        console.log(arr)
        setTimeout(() => {
          if (arr.length >= 1) {
            setData(arr);
            setShow(true);
            setIsLoading(false);
            console.log("data", arr.length);
          }
          else{
             setErrorMessage("No Trash available");
             setIsLoading(false);
             toast.dismiss();
             toast.error("No Trash available");
          }
        }, 10);
      })
      .catch((err) => {
        setErrorMessage("Unable to fetch Blogs");
        setIsLoading(false);
        toast.dismiss();
       toast.error(err.response.data.message);
       setTimeout(() => {
         navigate("/users/login");
         setAssured(false);
       }, 2000);

      });
  }, []);

  return (
    <>
      {" "}
      {errorMessage && <div className={styles.error}>{errorMessage}</div>}
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div style={{ height: "50px" }}></div>

          <div className={styles.main}>
            {data.map((elem, index) => {
              return (
                <div className={styles.mini}>
                  <div
                    style={{ display: "flex", justifyContent: "space-around" }}
                  >
                    <p
                      style={{
                        fontSize: "13px",
                        marginRight: "15px",
                        textAlign: "start",
                        marginTop: "0px",
                      }}
                    >
                      {elem.categories}
                    </p>
                    <p className={styles.date}>
                      {new Date(elem.createdAt).toString().substring(4, 15)}
                    </p>
                  </div>

                  <h3
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                    }}
                  >
                    {elem.Title}
                  </h3>
                  <p style={{ height: "15px", marginLeft: "15px" }}></p>

                  <div
                    className={styles.click}
                    style={{
                      display: "flex",
                      cursor: "pointer",
                      justifyContent: "space-around",
                    }}
                  >
                    <div
                      onClick={() => {
                        axios
                          .delete(
                            `https://blogingapp414.herokuapp.com/blogs/${elem._id}/false`,
                          )
                          .then((res) => {
                            toast.dismiss();
                            toast.success("YOU BLOG IS RESTORE");
                            navigate("/blogs");
                          })
                          .catch((err) => err.message);
                      }}
                    >
                      <MdOutlineRestore size="30px" color="#cc0000" />
                    </div>
                    <div
                      onClick={() => {
                        axios
                          .delete(
                            `https://blogingapp414.herokuapp.com/blogs/${elem._id}/delete`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            },
                          )
                          .then((res) => {
                            axios.delete(
                              `https://blogingapp414.herokuapp.com/users/blog/${id1}`,
                              {
                                id: elem._id,
                              },
                            );
                            toast.dismiss();
                            toast.error("YOU BLOG IS DELETED");
                            navigate("/blogs");
                          })
                          .catch((err) => err.message);
                      }}
                    >
                      <MdDelete size="30px" color="#cc0000" />
                    </div>
                    <div>
                      <MdArrowForward
                        size="30px"
                        onClick={() => {
                          navigate(`/blogs/${elem._id}`);
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
};

export default DeletedBlogs;
