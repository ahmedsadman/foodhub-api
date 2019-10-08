const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurant');

router.post('/review/:id', restaurantController.reviewRestaurant);
router.post('/order/:id', restaurantController.placeOrder);
router.get('/review/:id', restaurantController.getReviews);
router.get('/order', restaurantController.getOrders);
router.get('/search', restaurantController.searchRestaurant);
router.get('/details/:id', restaurantController.getDetails);
router.get('/user/:id', restaurantController.userRestaurant);

module.exports = router;
