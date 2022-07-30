const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  UserName:String,
  email:String,
  Blogs:[String], 
  password:String,
  otp:Number,
  status:Boolean,
  avatar:String
});
 UserSchema.set("timestamps", {
   createdAt: "createdAt",
   updatedAt: "updatedAt",
 });
const Users = model("User", UserSchema);
module.exports = Users;
