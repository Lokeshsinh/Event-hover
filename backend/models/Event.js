const mongoose = require("mongoose");

const EventSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  data: {
    type: Object,
    default: {}
  }
});

module.exports = mongoose.model("Event", EventSchema);
