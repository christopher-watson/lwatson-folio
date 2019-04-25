const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Images = new Schema({
  url: { 
    type: String, 
    default: 'none'
  },
});

module.exports = mongoose.model('Images', Images);