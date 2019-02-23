const Restaurant = require('../models/restaurant');

exports.createRestaurant = async (req, res, next) => {
    try {
        const restaurant = new Restaurant(req.body);
        const response =  await restaurant.save();

        res.status(201).send({
            message: 'Successfully Created',
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