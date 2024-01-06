// server.js

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// routes
const productsRoutes = require('./routes/products.routes'); // Dodaj odpowiednią ścieżkę do trasy produktów

app.use(express.json());
const port = process.env.PORT || 8000;

// Połączenie z bazą danych
mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
app.use(cors());

db.on('error', console.error.bind(console, 'Błąd połączenia z MongoDB:'));
db.once('open', () => {
  console.log('Połączono z bazą danych MongoDB!');
});

// Nasłuchiwanie na połączenie Socket.IO
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Obsługa rozłączenia klienta
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Dodaj trasy
app.use('/api', productsRoutes);

app.use((req, res, next) => {
    req.io = io; // Dodaj referencję do obiektu io do obiektu req
    next();
  });

io.on('connection', (socket) => {
    console.log('New socket!');
});

// Nasłuchiwanie na porcie 8000
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });