const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ratingSchema = new Schema({
    userId: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    restaurantId: {
        type: ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    food: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    service: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    environment: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    price: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
});

// make combination of userId and restaurantId unique
ratingSchema.index({ userId: 1, restaurantId: 1 }, { unique: true });

/* Update the rating of the corresponding restaurant */
ratingSchema.post('save', async function(doc) {
    console.log('Updating restaurant ratings');

    // Perform the aggregation
    // Rating is defined at later point, but mongoose somehow CAN get the reference earlier
    let agg = await Rating.aggregate([
        {
            $match: {
                restaurantId: mongoose.Types.ObjectId(
                    this.restaurantId
                )
            }
        },
        {
            $group: {
                _id: null,
                count: { $sum: 1 },
                foodRating: { $avg: '$food' },
                serviceRating: { $avg: '$service' },
                environmentRating: { $avg: '$environment' },
                priceRating: { $avg: '$price' },
            }
        }
    ]);
    
    const { foodRating, serviceRating, environmentRating, priceRating, count } = agg[0];
    console.log(foodRating, serviceRating, environmentRating, priceRating, count);

    const Restaurant = this.model('Restaurant');

    const restaurant = await Restaurant.findById(this.restaurantId);
    const avg = (foodRating + serviceRating + environmentRating + priceRating) / 4;
    
    // update the restaurant data
    restaurant.rating.food = foodRating;
    restaurant.rating.service = serviceRating;
    restaurant.rating.environment = environmentRating;
    restaurant.rating.price = priceRating;
    restaurant.rating.average = avg;
    restaurant.rating.count = count;

    await restaurant.save();
    console.log('value updated');
});

/* This kind of explicit Rating declaration is required for
the post save middleware to reference the model properly */
const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
