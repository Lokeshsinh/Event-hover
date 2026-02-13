

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Event = require("./models/Event");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Error:", err));


// ✅ SAVE EVENT
app.post("/api/events", async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      success: true,
      message: "Event saved"
    });
  } catch (error) {
    console.error("Save Error:", error);
    res.status(500).json({ success: false });
  }
});


// ✅ GET ALL EVENTS
app.get("/api/events", async (req, res) => {
  try {
    const events = await Event.find().sort({ timestamp: -1 });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch events" });
  }
});


// ✅ GET STATS
app.get("/api/stats", async (req, res) => {
  try {
    const total = await Event.countDocuments();
    const clickCount = await Event.countDocuments({ type: "click" });
    const scrollCount = await Event.countDocuments({ type: "scroll" });
    const hoverCount = await Event.countDocuments({ type: "mousemove" });

    res.json({
      total,
      clickCount,
      scrollCount,
      hoverCount
    });

  } catch (error) {
    res.status(500).json({ message: "Stats error" });
  }
});


app.listen(process.env.PORT || 5000, () =>
  console.log("Server running on port 5000")
);
