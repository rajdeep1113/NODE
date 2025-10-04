const express = require("express");
const { db } = require("./config/db");
const { productRouter } = require("./routes/productpage");
const PORT = 9090;
const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/product", productRouter);
app.listen(PORT, (err) => {
  if (err) {
    console.log("Server is not running ", PORT);
   
    return;
  }
   db();
  console.log("Server is running", PORT);
});
