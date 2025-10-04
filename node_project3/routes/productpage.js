const express = require("express");
const { productModel } = require("../models/product");
const productRouter = express.Router();

productRouter.get("/", async (req, res) => {
  let productData = await productModel.find({});
  return res.render("home", { productData });
});

productRouter.post("/", async (req, res) => {
  try {
    await productModel.create(req.body);
    console.log("Added");
    return res.redirect("/product");
  } catch (error) {
    // console.log(error)
    return res.json({ message: error });
  }
});

module.exports = { productRouter };
