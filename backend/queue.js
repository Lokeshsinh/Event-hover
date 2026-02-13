// const Queue = require("bull");
// require("dotenv").config();

// const eventQueue = new Queue("eventQueue", {
//   redis: {
//     host: process.env.REDIS_HOST,
//     port: process.env.REDIS_PORT,
//   },
// });

// module.exports = eventQueue;

const Queue = require("bull");
const Event = require("./models/Event");

const eventQueue = new Queue("eventQueue", {
  redis: {
    host: "127.0.0.1",
    port: 6379
  }
});

eventQueue.process(async (job) => {
  try {
    const event = new Event(job.data);
    await event.save();
    console.log("Saved from queue:", job.data.type);
  } catch (error) {
    console.error("Queue save error:", error);
  }
});

module.exports = eventQueue;

