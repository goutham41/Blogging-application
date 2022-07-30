const express = require("express");

const jwt = require("jsonwebtoken");
const Users = require("./model/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
// const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "546167257041-rql148ra0jqf07bqng1vs3s733sag8jp.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const GITHUB_CLIENT_ID = "23e071720101e336b3f1";
const GITHUB_CLIENT_SECRET = "f120d81011a8d5523125da42f3d740ff43d8fa90";

FACEBOOK_APP_ID = "your id";
FACEBOOK_APP_SECRET = "your id";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      // console.log(profile);

      done(null, profile);
    },
  ),
);

passport.use(
  new GithubStrategy(
    {
      clientID: GITHUB_CLIENT_ID,
      clientSecret: GITHUB_CLIENT_SECRET,
      callbackURL: "/auth/github/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      cb(null, profile);
    },
  ),
);

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: FACEBOOK_APP_ID,
//       clientSecret: FACEBOOK_APP_SECRET,
//       callbackURL: "/auth/facebook/callback",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       done(null, profile);
//     },
//   ),
// );

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
