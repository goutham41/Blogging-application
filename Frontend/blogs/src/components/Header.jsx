/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { ImBlogger } from "react-icons/im";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
const Header = () => {
  let navigate = useNavigate();
  const {
    token,
    setToken,
    assured,
    setAssured,
    id1,
    author,
    setId,
    emailOne,
    setEmailOne,
    avatar
  } = useContext(AuthContext);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/blogs">
            Blogs
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarText"
            aria-controls="navbarText"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarText">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              {!assured && (
                <>
                  <li class="nav-item">
                    <Link
                      to="/users/login"
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      login
                    </Link>
                  </li>
                  <li class="nav-item">
                    <Link
                      to="/signup"
                      class="nav-link active"
                      aria-current="page"
                      href="#"
                    >
                      signup
                    </Link>
                  </li>
                </>
              )}
              {assured && (
                <li class="nav-item">
                  <Link
                    to={`/users/blogs/${id1}`}
                    class="nav-link active"
                    aria-current="page"
                    href="#"
                  >
                    My Blogs
                  </Link>
                </li>
              )}

              {assured && (
                <li class="nav-item">
                  <Link to="/blogs/create" class="nav-link" href="#">
                    Create Blog
                  </Link>
                </li>
              )}
              {assured && (
                <li class="nav-item">
                  <Link class="nav-link" to="/blogs/trash">
                    Trash
                  </Link>
                </li>
              )}
              {assured && (
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    <img src={avatar} alt={author} style={{width:"30px",height:"30px"}}/>
                  </a>
                  <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
                    <li>
                      <span
                        class="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setAssured(false);
                          setToken("");
                          toast.dismiss();
                          toast.success("User LogOut Successfully");
                          navigate("/blogs");
                        }}
                      >
                        Logout
                      </span>
                    </li>
                    <li>
                      <span
                        class="nav-link"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          axios
                            .post(
                              `https://blogingapp414.herokuapp.com/users/reset`,
                              {
                                email: emailOne,
                              },
                            )
                            .then((res) => {
                              toast.dismiss();
                              toast.success(
                                "otp has send throught register mailId",
                              );
                              console.log(res.data);
                              setId(res.data.succ._id);
                              navigate("/otp");
                            })
                            .catch((err) => {
                              toast.success("You cannot reset your password ");
                            });
                        }}
                      >
                        Reset Password
                      </span>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
            {assured && <span class="navbar-text"> {author}</span>}
          </div>
        </div>
      </nav>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Header;
