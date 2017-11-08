const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Error!: ${err.message}`);
});


// load the app when the database connects successfully
const app = require('./app');


// testing sockets
const http = require('http').Server(app);
const io = require('socket.io')(http);


io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});

