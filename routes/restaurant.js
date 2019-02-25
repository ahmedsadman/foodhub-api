const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.post('/rate', restaurantController.rateRestaurant);

module.exports = router;
