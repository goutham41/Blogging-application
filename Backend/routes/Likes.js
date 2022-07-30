const { Router } = require("express");
const Likes = require("../model/Like");
const LikesRouter = Router();

 LikesRouter.get("/:id", async (req, res) => {
  let i = 1
   await Likes.findOneAndUpdate(
     { blogId: req.params.id },
     { $inc: { likes: i } },
   ).exec((err, succ) => {
     if (err) {
       return res.status.apply(500).send(err);
     } else {
       return res.status(201).send(succ);
     }
   });
 });

  LikesRouter.get("/one/:id", async (req, res) => {
  
   Likes.find({ blogId: req.params.id }).exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        return res.status(201).send(succ[0]);
      }
    });
  });

  LikesRouter.post("/", async (req, res) => {
    const like = new Likes(req.body);
        await like.save((err, succ) => {
        if (err) {
        return res
            .status(200)
            .send({ message: "Error occurred due wrong validation" });
        } else {
        return res.status(200).send(succ);
        }
    });
  });

  module.exports = LikesRouter