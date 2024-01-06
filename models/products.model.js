// models/product.model.js

const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  image: String,
  carouselImages: [String],
  sizeChart: {
    EU: [
      { size: String, available: Boolean },
    ],
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;