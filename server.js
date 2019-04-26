const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// Set up Express
const app = express();
const PORT = process.env.PORT || 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev')); // for logging

// Static assets
app.use(express.static(path.join(__dirname, 'client/build')));

// Use sessions to keep track of login status
app.use(session({secret: "mastadon", resave: true, saveUninitialized: true}));
app.use(passport.initialize());
app.use(passport.session());

// Set up passport to authenticate
const User = require('./server/models/users');
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Import routes
const routes = require('./server/routes');
app.use(routes);

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

