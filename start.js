const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DATABASE, { useMongoClient: true });
mongoose.Promise = global.Promise; // tell mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`Erro!: ${err.message}`);
});

// load the app when the database connects successfully
const app = require('./app');

app.listen(process.env.PORT, () => {
  console.log(`Magic is happening on ${process.env.PORT}`);
});

