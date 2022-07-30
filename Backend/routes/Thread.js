const { Router } = require("express");
const Thread = require("../model/Thread");
const ThreadRouter = Router();


ThreadRouter.post("/", async (req, res) => {
  const msg = new Thread(req.body);
  msg.save((err, succ) => {
    if (err) {
      return res
        .status(200)
        .send({ Thread: "Error occurred due wrong validation " });
    } else {
      return res.status(200).send(succ);
    }
  });
});

ThreadRouter.get("/:id", async (req, res) => {
  Thread.find({ messageId: req.params.id }).exec((err, succ) => {
    if (err) {
      return res.status.apply(500).send(err);
    } else {
      return res.status(201).send(succ);
    }
  });
});
 

module.exports = ThreadRouter;
