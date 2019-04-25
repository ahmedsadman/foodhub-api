const Restaurant = require('../models/restaurant');
const Review = require('../models/review');

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

exports.deleteRestaurant = async (req, res, next) => {
    try {
        const { id } = req.query;
        const response = await Restaurant.findByIdAndDelete(id);
        
        if (response) {
            res.send({
                message: 'Successfully Deleted'
            });
        } else {
            res.status(400).send({
                message: 'Not Found'
            })
        }
        
    } catch (e) {
        res.status(400).send({
            message: 'Error occured',
            error: e
        });
    }
};