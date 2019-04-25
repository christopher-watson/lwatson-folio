const router = require('express').Router();
const imageController = require('../../controllers/imageController');

// -- api/images/new
router
  .route('/new')
  .post(imageController.create);



module.exports = router;