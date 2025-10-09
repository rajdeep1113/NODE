const mongoose = require("mongoose");

const db = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/book");
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};
module.exports = { db };
