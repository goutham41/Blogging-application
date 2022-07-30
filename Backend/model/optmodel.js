const { Schema, model } = require("mongoose");

const OtpSchema = new Schema({
  userId: String,
  otp:Number,
  //totalattemps:Number,
  // request call :false
});

const Otp = model("Otp", OtpSchema);
module.exports = Otp;

