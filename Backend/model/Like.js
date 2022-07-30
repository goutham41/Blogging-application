const { Schema, model } = require("mongoose");

const LikesSchema = new Schema({
  likes:Number,
  blogId: String,
});

const Likes = model("Likes", LikesSchema);

module.exports = Likes;
