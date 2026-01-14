const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid"); // for generating UUIDs

const userSchema = new Schema({
  user_id: {
    type: String,
    default: uuidv4, // generate UUID by default
    unique: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password_hash: {
    type: String,
    required: true
  },
  role_id: {
    type: Number,
    ref: "Role", // assuming you have a Role model
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);
