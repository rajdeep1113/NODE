const express = require("express");
const { Book } = require("../models/books");
const app = express.Router();
const PORT = 7070;

app.get("/", async (req, res) => {
  const books = await Book.find({});
  res.render("home", { books });
});

app.get("/add", (req, res) => {
  res.render("add");
});

app.post("/add", async (req, res) => {
  try {
   await Book.create(req.body);
  res.redirect("/books");
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/edit/:id", async (req, res) => {
  const book = await Book.findById(req.params.id);
  res.render("edit", { book });
});
app.post("/edit/:id", async (req, res) => {
  try {
    await Book.findByIdAndUpdate(req.params.id,req.body);
    res.redirect("/books");
  } catch (err) {
    res.send(err.message);
  }
});

app.get("/delete/:id", async (req, res) => {
  try {
    await Book.findByIdAndDelete(req.params.id);
    res.redirect("/books");
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = { bookRouter: app };
