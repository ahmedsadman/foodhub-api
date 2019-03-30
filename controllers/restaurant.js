const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const mongoose = require('mongoose');

exports.reviewRestaurant = async (req, res, next) => {
    try {
        const data = {
            restaurantId: req.params.id,
            ...req.body
        };
        const review = new Review(data);
        const response = await review.save();

        res.status(201).send({
            message: 'Success',
            data: response
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: 'Error occured',
            error: e
        });
    }
};

const buildSearchQuery = (query) => {
    let { area, food, min_rating, features } = query;
    const queryObj = {};

    // handle the simple queries
    if (area) queryObj['address.area'] = area;
    if (food) queryObj['food_type'] = food;
    if (min_rating) queryObj['review.average'] = { $gte: min_rating };

    // handle more complex queries, such as array queries
    if (features) {
        // convert to uniform (array) type first
        features = typeof features === 'object' ? features : [features];

        for (const val of features) {
            queryObj[`features.${val}`] = true;
        }
    }

    return queryObj;
}

exports.searchRestaurant = async (req, res, next) => {
    console.log('--------------');
    const query = buildSearchQuery(req.query);
    console.log(query);

    try {
        const restaurants = await Restaurant.find(
            query,
            'name address review.average banner_image'
        );
        res.send({
            message: 'Success',
            data: restaurants
        });
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: 'Error occured',
            error: e
        });
    }
};
