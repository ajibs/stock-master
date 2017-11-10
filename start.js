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

const axios = require('axios');

io.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
    console.log(msg);
    socket.broadcast.emit('chat message', msg);
    axios
      .post('http://localhost:4000/add-stock', {
        company: msg
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  });

  socket.on('remove stock', (stockToRemove) => {
    console.log(stockToRemove);
    socket.broadcast.emit('remove stock', stockToRemove);
    axios
      .get(`http://localhost:4000/remove-stock/${stockToRemove}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((e) => {
        console.error(e);
      });
  });
});


http.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});

