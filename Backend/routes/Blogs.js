const { Router } = require("express");
const Blogs = require("../model/Blog");
const BlogsRouter = Router();
const jwt = require("jsonwebtoken");

BlogsRouter.post("/create", async (req, res) => {
  let obj = {
    ...req.body,
    Deleted: false,
  };
  const blog = new Blogs(obj);
  console.log(obj);

  blog.save((err, succ) => {
    if (err) {
      return res
        .status(500)
        .send({ message: "Erroe occurred due wrong validation " });
    } else {
      return res.status(201).send(succ);
    }
  });
});

// app.get("/profile/:_id", (req, res) => {
//   Users.find({ _id: req.params._id }).exec((err, succ) => {
//     if (err) {
//       return res.status(401).send("NOT have urser ID");
//     } else {
//       const token = req.headers["authorization"].split(" ")[1] || "";
//       try {
//         let decoded = jwt.verify(token, "mmm123");
//         if (decoded) {
//           return res.status(202).send(decoded);
//         }
//       } catch (error) {
//         return res.status(401).send("UNAUTHORIZATED");
//       }
//     }
//   });
// });

BlogsRouter.get("/:id", async (req, res) => {
  console.log(req.params.id);

  if (req.params.id === "trash") {
    Blogs.find({ Deleted: true }).exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        return res.status(201).send(succ);
      }
    });
  } else {
    Blogs.find({ _id: req.params.id }).exec((err, succ) => {
      if (err) {
        return res.status(500).send(err);
      } else {
        return res.status(201).send(succ);
      }
    });
  }
});

BlogsRouter.get("/", async (req, res) => {
  Blogs.find({ Deleted: false }).exec((err, succ) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

BlogsRouter.get("/userId/:id", async (req, res) => {
  // Blogs.find({ Deleted: false, userId: req.params.id }).exec((err, succ) => {
  //   if (err) {
  //     return res.status(500).send(err);
  //   } else {
  //     return res.status(201).send(succ);
  //   }
  // });
  Blogs.find({ userId: req.params.id }).exec((err, succ) => {
    if (err) {
      return res.status(401).send("NOT have urser ID");
    } else {
      const token = req.headers["authorization"].split(" ")[1] || "";
      try {
        let decoded = jwt.verify(token, "mmm1234");
        if (decoded) {
          Blogs.find({
            Deleted: false,
            userId: req.params.id
          }).exec((err, succ) => {
            if (err) {
              return res.status.apply(500).send(err);
            } else {
              return res.status(201).send(succ);
            }
          });
        }
      } catch (error) {
        return res.status(401).send("UNAUTHORIZATED");
      }
    }
  });
});

BlogsRouter.get("/trash/:id", async (req, res) => {
  Blogs.find({ Deleted: true, userId: req.params.id }).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

BlogsRouter.put("/:id", async (req, res) => {
  Blogs.find({ _id: req.params.id }).exec((err, succ) => {
    if (err) {
      return res.status(401).send("NOT have urser ID");
    } else {
      const token = req.headers["authorization"].split(" ")[1] || "";
      try {
        let decoded = jwt.verify(token, "mmm1234");
        if (decoded) {
          Blogs.findOneAndUpdate(
            { _id: req.params.id },
            {
              Content: req.body.Content,
              Title: req.body.Title,
            },
          ).exec((err, succ) => {
            if (err) {
              return res.status.apply(500).send(err);
            } else {
              return res.status(201).send(succ);
            }
          });
        }
      } catch (error) {
        return res.status(401).send("UNAUTHORIZATED");
      }
    }
  });
});

BlogsRouter.delete("/:id", async (req, res) => {
  await Blogs.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { Deleted: true } },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

BlogsRouter.delete("/:id/false", async (req, res) => {
  await Blogs.findOneAndUpdate(
    { _id: req.params.id },
    { $set: { Deleted: false } },
  ).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});

BlogsRouter.delete("/:id/delete", async (req, res) => {
  Blogs.find({ _id: req.params.id }).exec((err, succ) => {
    if (succ) {
      const token = req.headers["authorization"].split(" ")[1] || "";
      try {
        let decoded = jwt.verify(token, "mmm1234");
        if (decoded) {
          Blogs.deleteOne({ _id: req.params.id }).exec((err, succ) => {
            if (err) {
              return res.status.apply(500).send(err);
            } else {
              return res.status(201).send(succ);
            }
          });
        }
      } catch (error) {
        return res.status(401).send("UNAUTHORIZATED");
      }
    } else {
      return res.status(401).send("UNAUTHORIZATED");
    }
  });
});
module.exports = BlogsRouter;
