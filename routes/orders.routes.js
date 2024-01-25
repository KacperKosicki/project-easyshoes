const express = require('express');
const router = express.Router();
const Order = require('../models/orders.model'); // Zaimportuj model zamówienia

module.exports = (io) => { // Dodaj argument io
    // Obsługa zapytania GET dla wszystkich zamówień
    router.get('/', async (req, res) => {
        try {
            const orders = await Order.find();
            res.json(orders);
        } catch (error) {
            console.error('Błąd podczas pobierania zamówień:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas pobierania zamówień.' });
        }
    });

    // Obsługa zapytania POST dla nowych zamówień
    router.post('/', async (req, res) => {
        try {
            const orderData = req.body;
            const newOrder = new Order(orderData);
            await newOrder.save();

            // Emituj zdarzenie za pomocą Socket.IO, aby powiadomić klientów o nowym zamówieniu
            io.emit('newOrder', newOrder); // Tutaj użyj bez req.

            res.status(201).json(newOrder);
        } catch (error) {
            console.error('Błąd podczas zapisywania zamówienia:', error);
            res.status(500).json({ error: 'Wystąpił błąd podczas zapisywania zamówienia.' });
        }
    });

    return router;
};