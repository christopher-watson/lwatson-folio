const db = require('../models');
const User = require('../models/users');

module.exports = {
  findAll: function (req, res) {
    db
      .User
      .find(req.query)
      .sort({
        date: 1
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findByUserName: function (req, res) {
    // console.log(req.params)
    db
      .User
      .findOne({
        username: req.params.username
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function (req, res) {
    db
      .User
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function (req, res) {
    db
      .User
      .create(req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function (req, res) {
    db
      .User
      .findOneAndUpdate({
        _id: req.params.id
      }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function (req, res) {
    db
      .User
      .findById({
        _id: req.params.id
      })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  addImage: function (req, res) {
    console.log(req.params.id)
    db
      .User
      .findOneAndUpdate(
        { _id: req.params.id}, 
        { $push: { _images: req.body } },
        // {safe: true, upsert: true},
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  removeImage: function (req, res) {
    console.log(req.params.id)
    db
      .User
      .findOneAndUpdate(
        { _id: req.params.id}, 
        { $pull: { _images: req.body }},
      )
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  register: function (req, res) {
    const user = new User({
      username: req.body.username,
    })
    User
      .register(user, req.body.password, function (err) {
        if (err) {
          console.log('error while user register!', err);
          return res.status(422).json(err);
        }
        console.log('user registered!');
        res.json(true);
      });
  }
};