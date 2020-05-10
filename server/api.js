/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const Post = require("./models/post");
const User = require("./models/user");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socket = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user) socket.addUser(req.user, socket.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

router.get("/posts", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  console.log(req.user._id)
  Post.find({user_id: req.user._id}).then((posts)=> {
    res.send(posts);
  })
});

router.post("/post", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    time: req.body.time,
    user_id: req.user._id,
  });
  post.save();
  Post.find({user_id: req.user._id}).then((posts)=> {
    res.send(posts);
  })
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;
