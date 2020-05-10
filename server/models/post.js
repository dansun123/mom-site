const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  title: String,
  content: String,
  time: Date,
  user_id: String,
});

// compile model from schema
module.exports = mongoose.model("post", PostSchema);
