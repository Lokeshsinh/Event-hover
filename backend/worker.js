require("dotenv").config();
const mongoose = require("mongoose");

const eventQueue = require("./queue");
const Event = require("./models/Event");

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("Worker connected to MongoDB"))
  .catch((err) => console.error("MongoDB Error:", err));

eventQueue.process(async (job) => {
  const data = job.data;

  try {
    await Event.create({
      type: data.type,
      x: data.x || null,
      y: data.y || null,
      scrollY: data.scrollY || null,
      timestamp: new Date(),
    });

    console.log("Event saved to database");
  } catch (error) {
    console.error("Error saving event:", error);
  }
});
