const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const Users = new Schema({
  name: { 
    type: String, 
    default: 'testUser'
  },
  email: { 
    type: String, 
    default: 'testEmail'
  },
  _images: [{
    type: [Schema.Types.ObjectId], 
    ref: 'Images'
  }],
});

// Set up passport to 
Users.plugin(passportLocalMongoose);

module.exports = mongoose.model('Users', Users);