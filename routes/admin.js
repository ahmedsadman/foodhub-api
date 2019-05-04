const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin');

router.post('/restaurants/create', adminController.createRestaurant);
router.delete('/restaurants/delete', adminController.deleteRestaurant);
router.patch('/restaurants/update/:id', adminController.updateRestaurant);
router.patch('/users/update/:id', adminController.updateUser)
router.get('/users', adminController.getUsers);

module.exports = router;
