const router = require('express').Router();
const passport = require('passport');
const userController = require('../../controllers/userController');


// register a new user -- /api/users/register 
router
  .route('/register')
  .post(userController.register);

// login route -- /api/users/login
router
  .route('/login')
  .post(passport.authenticate('local'), function (req, res) {
    // console.log(req.user);
    if (req.user) {
      console.log(`${req.user.username} has logged in`)
    }
    res.json(req.user);
  })
  .get(function (req, res) {
    // console.log(req.user);
    if (req.user) {
      res.json({
        isLoggedIn: true,
        username: req.user.username
      });
    } else {
      res.json(false);
    }
  });

// logout route -- /api/users/logout
router
  .route('/logout')
  .get(function (req, res) {
    req.logout()
    console.log(`${req.user.username} has logged out`)
    res.json(false);
  })

// add image to user _image array -- api/users/add/imageid
router
  .route('/add/:id')
  .post(userController.addImage);

// -- api/users/find
router
  .route('/find/:username')
  .get(userController.findByUserName);

// remove image -- api/users/remove/:id
router
  .route('/remove/:id')
  .put(userController.removeImage);

module.exports = router;