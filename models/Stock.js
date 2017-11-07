const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  companies: [String]
});

module.exports = mongoose.model('Stock', stockSchema);
