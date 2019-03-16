const Restaurant = require('../models/restaurant');
const Rating = require('../models/rating');
const mongoose = require('mongoose');

exports.rateRestaurant = async (req, res, next) => {
    try {
        const data = {
            restaurantId: req.params.id,
            ...req.body
        }
        const rating = new Rating(data);
        const response = await rating.save();

        res.status(201).send({
            message: 'Success',
            data: response
        });
    } catch (e) {
        console.log(e);
        res.status(404).send({
            message: 'Error occured',
            error: e
        });
    }
};
