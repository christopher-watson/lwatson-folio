const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());
app.use(morgan('dev')); // for logging

// Import routes
const routes = require('./server/routes');
app.use(routes);

// Static assets
// app.use(express.static('client/build'));
app.use(express.static(path.join(__dirname, 'client/build')));

// DB Config
const keys = require("./config/keys");

// Connect to MongoDB
mongoose.connect(keys.mongoURI,{ useNewUrlParser: true, dbName: 'lwatson-db' })
  .then(() => console.log("💾  ==> DB successfully connected"))
  .catch(err => console.log(err));


// Start the API server
app.listen(PORT, function () {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
});

