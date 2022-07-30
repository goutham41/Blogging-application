const { Schema, model } = require("mongoose");

const BlogSchema = new Schema({
  Title: String,
  Content: String,
  Deleted: Boolean,
  categories:String,
  userId:String
});
BlogSchema.set("timestamps", {
  createdAt: "createdAt",
  updatedAt: "updatedAt",
});
const Blogs = model("Blog", BlogSchema);

module.exports = Blogs;
