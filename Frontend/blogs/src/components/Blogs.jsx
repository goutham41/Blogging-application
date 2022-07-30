import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../styles/Blog.module.css";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {MdArrowForward } from "react-icons/md";
import styled from "styled-components";
import LoadingSpinner from "../styled/Spinner";


const Blogs = () => {
   const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  let navigate = useNavigate();
  const [data, setData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
 const [Time, setTime] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs`)
      .then((res) => {
        let arr = res.data;
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
        setErrorMessage("Unable to fetch Blogs");
        setIsLoading(false);
        toast.dismiss();
        toast.error("Unable to fetch Blogs ");
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
                  <div style={{ display: "flex", width: "100%", justifyContent: "start" }}>
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
                  <div style={{ marginLeft: "140px",marginTop:"-50px" }}>
                    <p className={styles.date}>
                      {new Date(elem.createdAt).toString().substring(4, 15)}
                    </p>
                  </div>

                  <p
                    style={{
                      textAlign: "center",
                      marginTop: "50px",
                      color: "#1f2937",
                      fontSize: "16px",
                    }}
                  >
                    {elem.Title}
                  </p>
                  <p style={{ height: "15px", marginLeft: "15px" }}></p>

                  <p
                    style={{ marginLeft: "180px", cursor: "pointer" }}
                    onClick={() => {
                      navigate(`/blogs/${elem._id}`);
                    }}
                  >
                    <MdArrowForward size="30px" />
                  </p>
                </div>
              );
            })}
            
          </div>
        </>
      )}
    </>
  );
};

export default Blogs;
