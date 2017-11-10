const mongoose = require('mongoose');
require('dotenv').config();


mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Error!: ${err.message}`);
});


// load the app when the database connects successfully
const app = require('./app');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const axios = require('axios');


function updateDB(action, stockName) {
  axios
    .get(`${process.env.HOST}/${action}/${stockName}`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((e) => {
      console.error(e);
    });
}


io.on('connection', (socket) => {
  socket.on('add stock', (stockToAdd) => {
    socket.broadcast.emit('add stock', stockToAdd);
    updateDB('add-stock', stockToAdd);
  });

  socket.on('remove stock', (stockToRemove) => {
    socket.broadcast.emit('remove stock', stockToRemove);
    updateDB('remove-stock', stockToRemove);
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});
