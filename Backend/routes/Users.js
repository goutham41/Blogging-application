const { Router } = require("express");
const nodemailer = require("nodemailer");
const hbs = require("handlebars");
const Users = require("../model/User");
// const Otp = require("../model/")
const UsersRouter = Router();
const jwt = require("jsonwebtoken");
UsersRouter.post("/create", async (req, res) => {
  const user = new Users(req.body);

  Users.find({ UserName: req.body.UserName }).exec((err, succ) => {
    console.log(req.body.UserName);
    if (err) {
      res.status(201).send({ message: "some thing went wrong" });
    } else {
      if (succ.length === 1) {
        res.status(200).send(succ[0]._id);
      } else {
        user.save((err, succ) => {
          if (err) {
            return res
              .status(200)
              .send({ message: "Error occurred due wrong validation " });
          } else {
            return res.status(200).send(succ);
          }
        });
      }
    }
  });
});

UsersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await Users.findOne({ email: email, password: password });
  console.log(user);
  if (user === null) {
    res.status(401).send({ message: "sign in failed" });
  } else {
    const token = jwt.sign(
      { email: user?.email, password: user?.password },
      "mmm1234",
      {
        expiresIn: "12h",
      },
    );

    res.send({ message: "sign in success", token, user });
  }
});

UsersRouter.post("/signup/otp", (req, res) => {
  const { UserName, password, email } = req.body;
  //save the user get the usrt id of the user;
  Users.find({ email: req.body.email }).exec((err, succ) => {
    if (err) {
      res.status(201).send({ message: "some thing went wrong" });
    } else {
      if (succ.length === 1) {
        res.status(200).send("Account is already present");
      } else {
        const otp = Math.floor(100000 + Math.random() * 9000000);
        // user otp relation database
        //send the otp to email to the user to verify the email address;

        const transport = nodemailer.createTransport({
          host: "smtp.gmail.com",
          // port:1,// 456: ssl,  587: tls
          secure: false,
          port: 587,
          auth: {
            user: "blogmediumweb@gmail.com",
            pass: "odwakeukgqwfhfmb",
          },
        });
        const content = `<div>
                          <h1>Dear {{name}} </h1>
                          <p>{{email}}</p>
                          <p>Thank you for signing in:</p>
                          <p>your OTP is {{otp}}</p>
                          </div>
                       `;
        const template = hbs.compile(content);

        transport.sendMail({
          from: "blogmediumweb@gmail.com",
          to: email,
          subject: "Use this otp for create a account",
          html: template({ name: UserName, otp: otp ,email:email}),
        });
        let avatar = `https://avatars.dicebear.com/api/micah/${UserName}.svg`;
        let user1 = {
          ...req.body,
          otp,
          avatar,
        };
        const user = new Users(user1);
        user.save((err, succ) => {
          if (err) {
            return res
              .status(200)
              .send({ message: "Error occurred due wrong validation " });
          } else {
            return res
              .status(200)
              .send({ message: "sign in success", id: succ._id });
          }
        });
      }
    }
  });
});

UsersRouter.post("/validateotp/:id", async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  await Users.findOne({ _id: req.params.id }).exec((err, succ) => {
    if (succ) {
      console.log(succ.otp);
      if (otp == succ.otp) {
        const token = jwt.sign({ email: succ.email?.email }, "mmm1234", {
          expiresIn: "12h",
        });

        res.send({ message: "sign in success", token, succ });
      } else {
        res.status(401).send({ message: "signin failed due to wrong otp" });
      }
    } else {
      res.send(err);
    }
  });
  //check in your database is it valid or not
  //if valid send response as it is valid
  //else send response as otp invalid
});

// reseting password;

UsersRouter.post("/reset", (req, res) => {
  const { email } = req.body;
  //save the user get the usrt id of the user;
  Users.findOne({ email: req.body.email }).exec((err, succ) => {
    if (err) {
      res.status(201).send({ message: "some thing went wrong" });
    } else {
      const otp = Math.floor(100000 + Math.random() * 9000000);
      console.log(otp)

        Users.findOneAndUpdate(
          { email: req.body.email },
          {
            otp: Number(otp),
          },
        ).exec((err, succ) => {
          if (err) {
            return res.status.apply(500).send(err);
          } else {
            return res.status(201).send({
              message: "Your can reset your password via email otp validation",
              succ,
            });
          }
        });
      // user otp relation database
      //send the otp to email to the user to verify the email address;

      const transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        // port:1,// 456: ssl,  587: tls
        secure: false,
        port: 587,
        auth: {
          user: "blogmediumweb@gmail.com",
          pass: "odwakeukgqwfhfmb",
        },
      });
      const content = `<div>
                          <h1>hello {{name}} </h1>
                          <p>{{email}}</p>
                          <p>This is for your otp reset</p>
                          <p>your OTP is {{otp}}</p>
                          </div>
                       `;
      const template = hbs.compile(content);
     
      transport.sendMail({
        from: "blogmediumweb@gmail.com",
        to: email,
        subject: "Use this otp for reset your password",
        html: template({ name: succ.UserName, otp: otp, email: succ.email }),
      });
      //  res.send({
      //    message: "Your can reset your password via email otp validation",
      //    id:succ._id
      //  });

    
    }
  });
});

UsersRouter.post("/validatereset/:id", async (req, res) => {
  const { otp } = req.body;
  console.log(otp);
  await Users.findOne({ _id: req.params.id }).exec((err, succ) => {
    if (succ) {
      console.log(succ.otp);
      if (otp == succ.otp) {
        const token = jwt.sign({ email: succ.email?.email }, "mmm1234", {
          expiresIn: "12h",
        });

        res.send({ message: "you can reset your password", token, succ });
      } else {
        res.status(401).send({ message: "signin failed due to wrong otp" });
      }
    } else {
      res.send(err);
    }
  });
  //check in your database is it valid or not
  //if valid send response as it is valid
  //else send response as otp invalid
});

UsersRouter.put("/reset/:id", async (req, res) => {
  Users.find({ _id: req.params.id }).exec((err, succ) => {
    if (err) {
      return res.status(401).send("NOT have urser ID");
    } else {
      const token = req.headers["authorization"].split(" ")[1] || "";
      try {
        let decoded = jwt.verify(token, "mmm1234");
        if (decoded) {
          Users.findOneAndUpdate(
            { _id: req.params.id },
            {
              password: req.body.password,
            },
          ).exec((err, succ) => {
            if (err) {
              return res.status.apply(500).send(err);
            } else {
              return res
                .status(201)
                .send({ message: "your password is updated", succ });
            }
          });
        }
      } catch (error) {
        return res.status(401).send("UNAUTHORIZATED");
      }
    }
  });
});

UsersRouter.get("/userName/:id", async (req, res) => {
  console.log(req.params.id);
  let user = await Users.findOne({ UserName: req.params.id });
  console.log(user);
  if (user === null) {
    res.status(401).send({ message: "sign in failed" });
  } else {
    const token = jwt.sign({ UserName: user?.UserName }, "mmm1234", {
      expiresIn: "1h",
    });

    res.send({ message: "sign in success", token, user });
  }
});

UsersRouter.get("/", async (req, res) => {
  Users.find().exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

UsersRouter.put("/blog/:_id", (req, res) => {
  // console.log(req.params._id, req.body.id);
  Users.findOneAndUpdate(
    { _id: req.params._id },
    {
      $push: {
        Blogs: req.body.id,
      },
    },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(403).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

UsersRouter.delete("/blog/:_id", (req, res) => {
  // console.log(req.params._id, req.body.id);
  Users.findOneAndUpdate(
    { _id: req.params._id },
    {
      $pull: {
        Blogs: req.body.id,
      },
    },
  ).exec((err, succ) => {
    if (err) {
      return res.status(401).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});
module.exports = UsersRouter;
