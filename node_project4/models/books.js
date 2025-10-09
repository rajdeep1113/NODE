const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
});
const Book = mongoose.model("Book", bookSchema);
module.exports = { Book };
