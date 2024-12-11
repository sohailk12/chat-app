const express = require('express');
const mongoose = require('mongoose');
const http = require('http'); // For creating the server
const { Server } = require('socket.io'); // For WebSocket communication

// Import routes
const chatRoutes = require('./routes/route.js');
const connectDB = require('./config/db.js');

const app = express();
app.use(express.json());

connectDB();
// Use chat routes
app.use('/api/chat', chatRoutes);

// Create an HTTP server and attach WebSocket
const server = http.createServer(app);
const io = new Server(server);

// WebSocket logic
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle incoming messages and broadcast them
  socket.on('sendMessage', (data) => {
    io.emit('receiveMessage', data);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start the server
server.listen(3000, () => console.log(`Server running on port: 3000`));
