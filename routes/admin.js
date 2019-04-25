const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/restaurants/create', adminController.createRestaurant);
router.delete('/restaurants/delete', adminController.deleteRestaurant);

module.exports = router;
