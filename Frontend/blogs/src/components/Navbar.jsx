import React, { useContext } from "react";
import { ToastContainer } from "react-toastify";
import { Nav, NavLink, Bars, NavMenu } from "../styled/NavbarElem";
import TextButton from "../ButtonCmp/TextButton";
import { ImBlogger } from "react-icons/im";
import { AuthContext } from "./Auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Header from "./Header";
const Navbar = () => {
  let navigate = useNavigate();
  const { token, setToken, assured, setAssured, id1, author } =
    useContext(AuthContext);
  return (
    <>
      <Nav>
        <NavLink to="/blogs">
          {!assured && <ImBlogger size="40px" color="#fff" />}
          {assured && <p>{author}</p>}
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/blogs" activeStyle>
            BLOGS
          </NavLink>
          {assured && (
            <NavLink to="/blogs/create" activeStyle>
              CREATE BLOG
            </NavLink>
          )}
          {!assured && (
            <NavLink to="/users/login" activeStyle>
              LOGIN
            </NavLink>
          )}

          {assured && <NavLink to={`/users/blogs/${id1}`}>MY BLOGS</NavLink>}

          {assured && (
            <NavLink to="/blogs/trash" activeStyle>
              TRASH
            </NavLink>
          )}
          {assured && (
            <p
              style={{ cursor: "pointer" }}
              onClick={() => {
                setAssured(false);
                setToken("");
                toast.dismiss();
                toast.success("User LogOut Successfully");
                navigate("/blogs");
                
              }}
            >
              LOGOUT
            </p>
          )}
        </NavMenu>
      </Nav>
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

      <Header/>
    </>
  );
};

export default Navbar;
