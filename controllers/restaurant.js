const Restaurant = require('../models/restaurant');
const Rating = require('../models/rating');
const mongoose = require('mongoose');

exports.rateRestaurant = async (req, res, next) => {
    try {
        const rating = new Rating(req.body);
        const response = await rating.save();

        // const agg = await Rating.aggregate([
        //     {
        //         $match: {
        //             restaurantId: mongoose.Types.ObjectId(
        //                 '5c715499fe62764770a5c578'
        //             )
        //         }
        //     },
        //     {
        //         $group: {
        //             _id: null,
        //             count: { $sum: 1 },
        //             avg: { $avg: '$rating' }
        //         }
        //     }
        // ]);
        // console.log(agg);

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
