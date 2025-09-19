const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");

const alertTypeSchema = new mongoose.Schema({
  alert_type_id: {
    type: Number,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: String
});
module.exports = mongoose.model("AlertType", alertTypeSchema);
