const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const roleSchema = new mongoose.Schema({
  role_id: {
    type: Number,
    unique: true,
    required: true
  },
  role_name: {
    type: String,
    required: true,
    unique: true
  }
});
module.exports = mongoose.model("Role", roleSchema);
