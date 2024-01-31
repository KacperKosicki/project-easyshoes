// models/product.model.js

const mongoose = require('mongoose');

// Definicja schematu dla produktów
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

// Utwórz model na podstawie schematu
const Product = mongoose.model('Product', productSchema);

module.exports = Product;