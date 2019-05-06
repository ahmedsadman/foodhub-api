const Restaurant = require('../models/restaurant');
const Review = require('../models/review');
const Order = require('../models/order');
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

exports.getReviews = async (req, res, next) => {
    try {
        const restaurantId = req.params.id;
        const userId = req.query.id;

        let query = {};
        query.restaurantId = restaurantId;
        if (userId) query.userId = userId;

        const response = await Review.find(query)
            .populate('userId', 'username email')
            .exec();
        if (response) {
            res.send({
                found: response.length !== 0,
                data: response
            });
        } else {
            res.status(400).send({
                error: 'Error occured'
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: 'Error occured',
            error: e.message
        });
    }
};

const buildSearchQuery = query => {
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
};

const buildSortQuery = query => {
    let sortCondition = {};
    const { sort } = query;
    if (sort === 'popularity') sortCondition['review.count'] = -1;
    else if (sort === 'rating') sortCondition['review.average'] = -1;
    else if (sort === 'recent') sortCondition._id = -1;

    return sortCondition;
};

exports.searchRestaurant = async (req, res, next) => {
    console.log('--------------');
    const query = buildSearchQuery(req.query);
    // console.log(query);
    const sortCondition = buildSortQuery(req.query);
    console.log(sortCondition);

    try {
        const restaurants = await Restaurant.find(
            query,
            'name address review.average review.count banner_image'
        ).sort(sortCondition);
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

exports.userRestaurant = async (req, res, next) => {
    const { id } = req.query;

    try {
        if (!id) throw new Error('ID must be valid');

        const response = await Restaurant.find({ owner: id });
        if (response) {
            res.send({
                message: 'Found',
                data: response
            });
        } else {
            res.send({
                message: 'No records found',
                data: null
            });
        }
    } catch (e) {
        console.log(e);
        res.status(400).send({
            message: 'Error occured',
            error: e.message
        });
    }
};

exports.getDetails = async (req, res, next) => {
    const { id } = req.query;
    console.log(id);

    try {
        const response = await Restaurant.findById(id);
        if (response) {
            res.send({
                message: 'Success',
                data: response
            });
        } else {
            res.status(400).send({ message: 'Not found' });
        }
    } catch (e) {
        res.status(400).send({
            error: e.message
        });
    }
};

exports.placeOrder = async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = {
            restaurant: id,
            ...req.body
        };
        const order = new Order(data);
        const response = await order.save();

        res.status(201).send({
            message: 'Order created successfully',
            data: response
        });
    } catch (e) {
        res.status(400).send({
            message: 'Error occured',
            error: e.message
        });
    }
};

exports.getOrders = async (req, res, next) => {
    try {
        const { userId, restaurantId } = req.query;
        let query = {};
        if (userId) query.user = userId;
        if (restaurantId) query.restaurant = restaurantId;

        const response = await Order.find(query).populate('restaurant', 'name').populate('user', 'username email').exec();
        res.send({
            message: 'Success',
            data: response
        })
    } catch (e) {
        res.status(400).send({
            message: 'Error occured',
            error: e.message
        });
    }
};
