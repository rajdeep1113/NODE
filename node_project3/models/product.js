const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  productName: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
});
const productModel = mongoose.model("product", productSchema);
module.exports = { productModel };
