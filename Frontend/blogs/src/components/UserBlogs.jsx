import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "../styles/Blog.module.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MdDelete } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import styled from "styled-components";
import { MdArrowForward } from "react-icons/md";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../styled/Spinner";
import {FcFullTrash } from "react-icons/fc";
import { AuthContext } from "./Auth";
const Tr = styled.tr`
  background: ${(props) => (props.isOdd ? "#7f7bff2c" : "#cecece")};
  height: 60px;
`;
const UserBlogs = () => {
  const { id } = useParams();
  const { token, setToken, assured, setAssured, id1 } = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [del, setDel] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/userId/${id1}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let arr = res.data;
        console.log(arr)
        setTimeout(() => {
          if (arr.length >= 1) {
            setData(arr);
            setShow(true);
            setIsLoading(false);
          } else {
           
            setErrorMessage(" Blogs is not  available");
            setIsLoading(false);
            toast.dismiss();
            toast.error("No Blogs available");
          }
        }, 10);
      })
      .catch((err) => {
        setIsLoading(false);
        toast.dismiss();
       toast.error(err.response.data.message);
       setTimeout(() => {
         navigate("/users/login");
         setAssured(false);
       }, 1000);
      });
  }, []);

  return (
    <>
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
                    style={{ display: "flex", justifyContent: "start" }}
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
                   
                  </div>
                  <div style={{ marginLeft: "140px", marginTop: "-50px" }}>
                    <p className={styles.date}>
                      {new Date(elem.createdAt).toString().substring(4, 15)}
                    </p>
                  </div>

                  <h5
                    style={{
                      textAlign: "center",
                      marginTop: "40px",
                    }}
                  >
                    {elem.Title}
                  </h5>
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
                          .delete(`https://blogingapp414.herokuapp.com/blogs/${elem._id}`)
                          .then((res) => {
                            toast.dismiss();
                            toast.error("YOU BLOG GONE TRASH");
                            navigate("/blogs");
                          })
                          .catch((err) => err.message);
                      }}
                    >
                      <FcFullTrash size="30px" color="#cc0000" />
                    </div>
                    <div
                      onClick={() => {
                        setDel(false);
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
                      <AiOutlineEdit
                        size="30px"
                        onClick={() => {
                          navigate(`/blogs/${elem._id}/edit`);
                        }}
                      />
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

export default UserBlogs;
