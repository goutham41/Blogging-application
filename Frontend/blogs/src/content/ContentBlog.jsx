import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import socketIOClient from "socket.io-client";
import { MdStar } from "react-icons/md";
import { AiFillLike } from "react-icons/ai";
import { AuthContext } from "../components/Auth";
const ENDPOINT = "https://blogingapp414.herokuapp.com/";

const ContentBlog = () => {
  const { id } = useParams();
    let navigate = useNavigate();
  console.log(id);
  const [response, setResponse] = useState("");
  const [msgOne, setMsgOne] = useState("");
  const [msg, setMsg] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("comment", (data) => {
      setArrivalMessage(data);
    });
  }, []);
    useEffect(() => {
      arrivalMessage && setMsg((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);

   

  const { id1, author, avatar ,assured} = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const [like, setLike] = useState(0);
  const [value, setValue] = useState("");
  const [content, setContent] = useState(0);
  const [msgId, setMsgId] = useState("");
  const [thread, setThread] = useState([]);
  const [show1, setShow1] = useState(false);

  useEffect(() => {
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/${id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) => err.message);

    axios.get(`https://blogingapp414.herokuapp.com/api/comments/${id}`).then((res) => {
      console.log(res.data);
      setMsg(res.data);
    });

    axios
      .get(`https://blogingapp414.herokuapp.com/likes/one/${id}`)
      .then((res) => {
        setLike(res.data.likes);
      })
      .catch((err) => err.message);
  }, [id]);

 const handleMsg = () => {
    if (value.length > 0 && assured === true) {
      let data = {
        username: author,
        comment: value,
        blogId: id,
        avatar: avatar,
      };

      const socket = socketIOClient(ENDPOINT);
      socket.emit("comment", data);
      axios.post("https://blogingapp414.herokuapp.com/api/comments", data);
    } else if (content > 10) {
      toast.dismiss();
      toast.error("rating canot be morethan 10");
    } else if(assured === false){
       toast.error("login to comment");
        navigate("/users/login");
    }
    else {
      toast.dismiss();
      toast.error("Write Comment any thing");
    }
  };


  const handleThread = () => {
    axios
      .post(`https://blogingapp414.herokuapp.com/thread/`, {
        thread: value,
        blogId: id,
        messageId: msgId,
      })
      .then((res) => {})
      .catch((err) => err.message);
    setTimeout(() => {
      axios
        .get(`https://blogingapp414.herokuapp.com/thread/${msgId}`)
        .then((res) => {
          setThread(res.data);
        })
        .catch((err) => err.message);
    }, 1000);

    // setShow(false);
  };

  const handleLikes = () => {
    axios
      .get(`https://blogingapp414.herokuapp.com/likes/${id}`)
      .then((res) => {
        setLike(res.data.likes);
      })
      .catch((err) => err.message);

    axios
      .get(`https://blogingapp414.herokuapp.com/likes/one/${id}`)
      .then((res) => {
        setLike(res.data.likes);
        console.log(res.data.likes);
      })
      .catch((err) => err.message);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        <p>
          Created at: {new Date(data.createdAt).toString().substring(4, 15)}
        </p>

        <p>
          Updated at: {new Date(data.createdAt).toString().substring(4, 15)}
        </p>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <nav id="navbar-example2" class="navbar navbar-light bg-light px-3">
          <Link
            class="nav-link"
            to={`/blogs/${id}`}
            onClick={() => setShow(false)}
          >
            Blog
          </Link>
          <ul class="nav nav-pills">
            {/* <li class="nav-item">
              <span
                class="nav-link"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  setShow(true);
                }}
              >
                Message
              </span>
            </li> */}
          </ul>
        </nav>
        <div
          data-bs-spy="scroll"
          data-bs-target="#navbar-example2"
          data-bs-offset="0"
          class="scrollspy-example"
          tabindex="0"
          style={{ marginLeft: "10px" }}
        >
          {!show && (
            <>
              <div>
                <h4 id="scrollspyHeading1"> {data.Title}</h4>
                <p> {data.Content}</p>
              </div>
              <div class="input-group mb-3">
                <span
                  class="input-group-text"
                  id="basic-addon2"
                  style={{ cursor: "pointer", backgroundColor: "#fff" }}
                  onClick={handleLikes}
                >
                  <AiFillLike size="30px" /> {like}
                </span>

                <input
                  type="text"
                  class="form-control"
                  placeholder="Write about blog"
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  onChange={(e) => setValue(e.target.value)}
                />
              
                <span
                  class="input-group-text"
                  id="basic-addon2"
                  style={{ cursor: "pointer" }}
                  onClick={handleMsg}
                >
                  send
                </span>
              </div>
              <div
                style={{ width: "100%", marginLeft: "-5px", margin: "auto" }}
              >
                <div
                  style={{
                    width: "100%",
                    marginLeft: "-5px",
                    margin: "auto",
                    height: "220px",
                    overflowX: "hidden",
                    overflowY: "auto",
                  }}
                >
                  <ul class="list-group list-group-flush">
                    {msg.map((elem, index) => {
                      return (
                        <>
                          <li
                            class="list-group-item"
                            style={{ display: "flex" }}
                          >
                            <span>
                              {" "}
                              <img
                                src={
                                  elem.avatar ||
                                  "https://avatars.dicebear.com/api/micah/banty.svg"
                                }
                                alt={elem.username}
                                style={{ width: "15%", borderRadius: "50%" }}
                              />
                              <br />
                              <span>{elem.username}</span>
                            </span>

                            <span style={{ width: "70%" }}>
                              {" "}
                              {elem.comment}
                            </span>
                            <span
                              style={{
                                width: "22%",
                                color: "blue",
                                fontSize: "12px",
                                paddingTop: "10px",
                                textAlign: "end",
                                cursor: "pointer",
                              }}
                          
                            >
                              {new Date(`${elem.createdAt}`).toLocaleTimeString()}
                            </span>
                          </li>
                        </>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </>
          )}
          {show && (
            <>
              {show1 && (
                <>
                  <div
                    style={{
                      height: "20px",
                      textAlign: "center",
                      color: "blue",
                    }}
                  >
                    THREADS
                  </div>
                  <div
                    style={{
                      width: "100%",
                      marginLeft: "-5px",
                      margin: "auto",
                      height: "200px",
                      overflowX: "hidden",
                      overflowY: "auto",
                    }}
                  >
                    <ul class="list-group list-group-flush">
                      {thread.map((elem) => {
                        return (
                          <li
                            class="list-group-item"
                            style={{ textAlign: "start" }}
                          >
                            {elem.thread}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div class="input-group mb-3">
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Write about blog"
                      aria-label="Recipient's username"
                      aria-describedby="basic-addon2"
                      onChange={(e) => setValue(e.target.value)}
                    />

                    <span
                      class="input-group-text"
                      id="basic-addon2"
                      style={{ cursor: "pointer" }}
                      onClick={handleThread}
                    >
                      send
                    </span>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ContentBlog;
