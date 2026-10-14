const mongoose = require("mongoose");

const dbConnect = async () => {
  if (!process.env.MONGODB_URL) throw new Error("MONGODB_URL is not configured.");
  await mongoose.connect(process.env.MONGODB_URL);
};

module.exports = dbConnect;
