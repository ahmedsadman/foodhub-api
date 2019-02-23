const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/restaurants/create', adminController.createRestaurant);

module.exports = router;