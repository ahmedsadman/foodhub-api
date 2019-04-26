const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/restaurants/create', adminController.createRestaurant);
router.delete('/restaurants/delete', adminController.deleteRestaurant);
router.patch('/restaurants/update', adminController.updateRestaurant);

module.exports = router;
