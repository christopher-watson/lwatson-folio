const router = require('express').Router();
const userRoutes = require('./userRoutes');
const imageRoutes = require('./imageRoutes');


// API routes
router.use('/users', userRoutes);
router.use('/images', imageRoutes);


module.exports = router;
