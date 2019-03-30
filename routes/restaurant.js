const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.post('/review/:id', restaurantController.reviewRestaurant);
router.get('/search', restaurantController.searchRestaurant)

module.exports = router;
