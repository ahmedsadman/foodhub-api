const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.post('/review/:id', restaurantController.reviewRestaurant);
router.get('/review/:id', restaurantController.getReviews);
router.get('/search', restaurantController.searchRestaurant);
router.get('/details', restaurantController.getDetails)
router.get('/user', restaurantController.userRestaurant);

module.exports = router;
