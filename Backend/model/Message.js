const { Schema, model } = require("mongoose");

const MessageSchema = new Schema({
 message:String,
 rating:Number,
 blogId:String,
 thread:String
});

const Message = model("Message", MessageSchema);

module.exports = Message;
