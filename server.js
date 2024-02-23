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

// Connection to the database
// Połączenie z bazą danych
mongoose.connect('mongodb+srv://kosickikacper1:1OaQvJk7zFG57Nfm@cluster0.b2vomcn.mongodb.net/products?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database!');
});

// CORS configuration
const corsOptions = {
  origin: '*' // allow requests from any origin, you may want to change this to your domain
};

app.use(cors(corsOptions));

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  // Handling client disconnection
  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Routes
app.use('/api', productsRoutes);
app.use('/api/orders', ordersRoutes);

app.use((req, res, next) => {
  req.io = io;
  next();
});

// Serving static files from the React app
app.use(express.static(path.join(__dirname, '/client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));
});

// Listening on port 8000
server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});