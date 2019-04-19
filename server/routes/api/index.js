const router = require('express').Router();
const userRoutes = require('./userRoutes');


// API routes
router.use('/users', userRoutes);


module.exports = router;
