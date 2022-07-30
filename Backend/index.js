const mongoose = require("mongoose");
const connection = mongoose.connect("mongodb://127.0.0.1:27017/BLOGS");
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const cors = require("cors");
const BlogsRouter = require("./routes/blogs");
const UsersRouter = require("./routes/Users");
const MessagesRouter = require("./routes/Message");
const LikesRouter = require("./routes/Likes");
const ThreadRouter = require("./routes/Thread");
const authRoute = require("./routes/Auth");
require("./passport")
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const passport = require("passport");
const session = require("express-session");

 app.use(
  session({
    secret: "goutham123",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  }),
)
app.use(passport.initialize());
app.use(passport.session());
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  }),
);
app.use("/blogs", BlogsRouter);
app.use("/users", UsersRouter);
app.use("/message", MessagesRouter);
app.use("/likes", LikesRouter);
app.use("/auth", authRoute);
app.use("/thread", ThreadRouter);
app.listen(PORT, async () => {
  await connection;
  console.log("connected to db");
  console.log("server started localhost:8080/");
});
