// server.js

const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const path = require('path');
const socketIO = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// routes
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes')(io);

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

// Trasy
app.use('/api', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

io.on('connection', (socket) => {
    console.log('New socket!');
});

// Nasłuchiwanie na porcie 8000
server.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
  });