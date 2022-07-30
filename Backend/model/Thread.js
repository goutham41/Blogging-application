const { Schema, model } = require("mongoose");

const ThreadSchema = new Schema({
  thread: String,
  blogId: String,
  messageId:String
});

const Thread = model("Thread", ThreadSchema);

module.exports = Thread;
