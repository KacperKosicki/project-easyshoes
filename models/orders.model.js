// models/Order.js

const mongoose = require('mongoose');

// Definicja schematu dla zamówienia
const orderSchema = new mongoose.Schema({
  items: [
    {
      id: { type: String, required: true },
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true }
    }
  ],
  selectedSize: { type: String }, // Rozmiar wybrany przez użytkownika
  createdAt: { type: Date, default: Date.now } // Data utworzenia zamówienia
});

// Utwórz model na podstawie schematu
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;