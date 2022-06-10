const mongoose = require("mongoose");

const typeSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    unique: true,
    min: 1,
    max: 128,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Type", typeSchema);
