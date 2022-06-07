const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    required: true,
    min: 1,
    max: 128,
  },
  minute: {
    type: Number,
    required: true,
    min: 0,
    max: 1440,
  },
  second: {
    type: Number,
    required: true,
    min: 0,
    max: 60,
  },
  count: {
    type: Number,
    required: true,
    min: 1,
    max: 1000,
  },
  userid: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
