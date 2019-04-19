const router = require('express').Router();
const passport = require('passport');
const userController = require('../../controllers/userController');

// -- api/users/new
router
  .route('/new')
  .post(userController.create);

// -- /api/user/login
router
  .route('/login')
  .post(passport.authenticate('local'), function(req, res) {
    console.log(req.user);
    if(req.user){
      console.log(`${req.user.username} has logged in`)
    }
    res.json(req.user);
  })
  .get(function(req, res) {
    console.log(req.user);
    if (req.user) {
      res.json({isLoggedIn: true, username: req.user.username});
    } else {
      res.json(false);
    }
  });

// logout route
router
  .route('/logout')
  .get(function(req,res) {
    // Log user out
    req.logout()
    console.log(req.user);
    res.json(false);
  })


// api/users/add/imageid
router
  .route('/add/:id')
  .post(userController.addImage);

// // Matches with "/api/users/:id"
// router
//   .route('/:id')
//   .get(userController.findByUserName)
//   .put(userController.update)
//   .delete(userController.remove);

module.exports = router;
