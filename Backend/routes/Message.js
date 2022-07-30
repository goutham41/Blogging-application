const { Router } = require("express");
const Messages = require("../model/Message");
const MessagesRouter = Router();

const history = [];

MessagesRouter.post("/msg", async (req, res) => {

  const msg = new Messages(req.body);
  msg.save((err, succ) => {
    if (err) {
      return res
        .status(200)
        .send({ message: "Error occurred due wrong validation " });
    } else {
      return res.status(200).send(succ);
    }
  });
});

MessagesRouter.post("/msg/thread", async (req, res) => {
  const msg = new Messages(req.body);
  msg.save((err, succ) => {
    if (err) {
      return res
        .status(200)
        .send({ message: "Error occurred due wrong validation " });
    } else {
      return res.status(200).send(succ);
    }
  });
});

MessagesRouter.get("/:id", async (req, res) => {
    Messages.find({ blogId: req.params.id }).exec((err, succ) => {
      if (err) {
        return res.status.apply(500).send(err);
      } else {
        return res.status(201).send(succ);
      }
    });
});
 








module.exports = MessagesRouter;