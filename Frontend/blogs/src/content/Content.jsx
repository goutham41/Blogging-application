import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BiArrowBack } from "react-icons/bi";
import { AiFillLike } from "react-icons/ai";
import { GrClose } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import DefaultButton from "../ButtonCmp/DefaultButton";
import ContentBlog from "./ContentBlog";
const Content = () => {
  const { id } = useParams();
  console.log(id);
  let navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState([]);
  const [thread, setThread] = useState([]);
  const [Time, setTime] = useState("");
  const [Time1, setTime1] = useState("");
  const [value, setValue] = useState("");
  const [content, setContent] = useState(0);
  const [like, setLike] = useState(0);
  const [msgId, setMsgId] = useState("");

  useEffect(() => {
    axios
      .get(`https://blogingapp414.herokuapp.com/blogs/${id}`)
      .then((res) => {
        setData(res.data[0]);
        formatDate(res.data[0].updatedAt);
        formatDate1(res.data[0].createdAt);
      })
      .catch((err) => err.message);

    axios
      .get(`https://blogingapp414.herokuapp.com/message/${id}`)
      .then((res) => {
        setMsg(res.data);
      })
      .catch((err) => err.message);

    axios
      .get(`https://blogingapp414.herokuapp.com/likes/one/${id}`)
      .then((res) => {
        setLike(res.data.likes);
      })
      .catch((err) => err.message);
  }, [id]);

  function formatDate(string) {
    var ts = new Date(string);
    setTime(ts.toLocaleString());
  }
  function formatDate1(string) {
    var ts1 = new Date(string);
    setTime1(ts1.toLocaleString());
  }
  const handleMsg = () => {
    if (value.length > 0 && content.length > 0 && content <= 10) {
      axios
        .post(`https://blogingapp414.herokuapp.com/message/msg`, {
          message: value,
          rating: content,
          blogId: id,
        })
        .then((res) => {})
        .catch((err) => err.message);

      axios
        .get(`https://blogingapp414.herokuapp.com/message/${id}`)
        .then((res) => {
          setMsg(res.data);
          console.log(res.data);
        })
        .catch((err) => err.message);
    } else if (content > 10) {
      toast.dismiss();
      toast.error("rating canot be morethan 10");
    } else {
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

    setShow(false);
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
      {/* <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "30px",
        }}
      >
        <p>Created At: {Time1}</p>
        <p>Updated At: {Time}</p>
      </div> */}
      {/*   <button
        style={{
          cursor: "pointer",
          height: "35px",
          backgroundColor: "#fff",
          border: "2.5px solid gainsboro",
          marginLeft: "-880px",
        }}
        onClick={() => {
          navigate(`/blogs`);
        }}
      >
        <BiArrowBack size="25px" />
      </button>
      <div
        style={{
          display: "flex",
          border: "1px solid gainsboro",
          width: "60%",
          margin: "auto",
          justifyContent: "space-around",
          marginTop: "30px",
          borderBottom: "0px",
          height: "35px",
        }}
      >
        <div style={{ color: "#1d1d1d", fontWeight: "600" }}>TITLE</div>
        <div style={{ color: "#1d1d1d", fontWeight: "600" }}>CONTENT</div>
      </div>
      <div
        style={{
          display: "flex",
          border: "1px solid gainsboro",
          width: "60%",
          margin: "auto",
          justifyContent: "space-around",
          marginTop: "0px",
          padding: "0px 20px",
        }}
      >
        <div
          style={{
            width: "30%",
            textAlign: "center",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          {data.Title}
        </div>
        <div
          style={{
            width: "70%",
            textAlign: "justify",
            marginTop: "10px",
            marginBottom: "15px",
          }}
        >
          {data.Content}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          margin: "auto",
          justifyContent: "space-around",
          marginTop: "20px",
          width: "80%",
        }}
      >
        <div style={{ marginTop: "-20px" }}>
          <p onClick={handleLikes}>
            <AiFillLike size="30px" />{" "}
            <p style={{ marginTop: "-30px", marginLeft: "70px" }}>{like}</p>
          </p>
        </div>
        {!show && (
          <div style={{ marginBottom: "50px" }}>
            <input
              style={{
                width: "350px",
                height: "30px",
                border: "1px solid gainsboro",
              }}
              type="text"
              value={value}
              placeholder="comment about Blog"
              onChange={(e) => setValue(e.target.value)}
            />
            <input
              style={{
                width: "50px",
                height: "30px",
                border: "1px solid gainsboro",
              }}
              type="number"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <DefaultButton onClick={handleMsg}>Send</DefaultButton>
          </div>
        )}
        {show && (
          <div style={{ marginBottom: "50px" }}>
            <input
              style={{
                width: "350px",
                height: "30px",
                border: "1px solid gainsboro",
              }}
              type="text"
              value={value}
              placeholder="Write Thread"
              onChange={(e) => setValue(e.target.value)}
            />

            <DefaultButton onClick={handleThread}>Send</DefaultButton>
          </div>
        )}
      </div>
      <div style={{ display: "flex", width: "80%", margin: "auto" }}>
        <div
          style={{
            height: "auto",
            width: "68.5%",
            padding: "20px 30px",
            border: "1px solid gainsboro",
            marginTop: "20px",
            marginBottom: "30px",
            overflow: "scroll",
            justifyContent: "start",
            lineHeight: "16px",
          }}
        >
          <div
            style={{
              border: "1px solid gainsboro",
              height: "45px",
              marginTop: "-30px",
              justifyContent: "space-around",
              display: "flex",
            }}
          >
            <p>COMMENTS</p>
            <p>RATING</p>
          </div>
          {msg.map((elem, index) => {
            return (
              <>
                <div key={index} style={{ display: "flex" }}>
                  <p
                    style={{
                      width: "70%",
                      textAlign: "start",
                      marginLeft: "30px",
                    }}
                  >
                    {elem.message}
                  </p>
                  <p style={{ width: "10%" }}>{elem.rating}</p>
                  <DefaultButton
                    style={{ marginTop: "10px" }}
                    onClick={() => {
                      setShow(true);
                      setValue("");
                      setMsgId(elem._id);
                      axios
                        .get(`https://blogingapp414.herokuapp.com/thread/${elem._id}`)
                        .then((res) => {
                          setThread(res.data);
                          setShow1(true);
                        })
                        .catch((err) => err.message);
                    }}
                  >
                    Thread
                  </DefaultButton>
                </div>
              </>
            );
          })}
        </div>

        {show1 && (
          <div
            style={{
              height: "auto",
              width: "30.5%",
              padding: "20px 30px",
              border: "1px solid gainsboro",
              marginTop: "20px",
              marginBottom: "30px",
              overflow: "scroll",
              justifyContent: "start",
              lineHeight: "16px",
              // margin:"auto"
            }}
          >
            <div
              style={{
                border: "1px solid gainsboro",
                height: "45px",
                marginTop: "-30px",
                justifyContent: "space-around",
                display: "flex",
              }}
            >
              <p>THREADS</p>
              <DefaultButton
                style={{
                  marginTop: "10px",
                  marginLeft: "100px",
                  border: "0px",
                }}
                onClick={() => {
                  setShow1(false);
                  setShow(false);
                }}
              >
                <GrClose size="20px" />
              </DefaultButton>
            </div>

            {thread.map((elem) => {
              return <p style={{ textAlign: "start" }}>{elem.thread}</p>;
            })}
          </div>
        )}
      </div> */}
      <ContentBlog />
    </>
  );
};

export default Content;
