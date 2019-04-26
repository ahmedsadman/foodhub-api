const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;
mongoose.set('useCreateIndex', true);

const restaurantSchema = new Schema({
    owner: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    banner_image: {
        type: String,
        required: true
    },
    restaurant_type: {
        type: [String],
        required: true,
        validate: v => v == null || v.length > 0
    },
    food_type: {
        type: [String],
        required: true,
        validate: v => v == null || v.length > 0
    },
    hour: {
        start: {
            type: String, 
            required: true
        },
        end: {
            type: String,
            required: true
        }
    },
    menu: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                },
                unit_price: {
                    type: Number,
                    required: true
                },
                type: {
                    type: String,
                    required: true
                }
            }
        ],
        validate: v => v == null || v.length > 0,
        required: true
    },
    images: [String],
    features: {
        wifi: Boolean,
        delivery: Boolean,
        ac: Boolean,
        smoking_zone: Boolean,
        reservation: Boolean,
        parking: Boolean
    },
    social: {
        facebook: String,
        instagram: String,
        twitter: String,
        contact: String
    },
    offers: {
        type: [
            {
                title: {
                    type: String,
                    required: true
                },
                image: String,
            }
        ]
    },
    address: {
        full: String,
        area: {
            type: String,
            required: true
        },
        district: {
            type: String,
            required: true
        }
    },
    review: {
        food: {
            type: Number,
            default: 0
        },
        environment: {
            type: Number,
            default: 0
        },
        service: {
            type: Number,
            default: 0
        },
        price: {
            type: Number,
            default: 0
        },
        average: {
            type: Number,
            default: 0
        },
        count: {
            type: Number,
            default: 0
        }
    },
    isFeatured: {
        type: Boolean,
        default: false
    },
    location: {
        // geo-json
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, {
    timestamps: true
});

// setup the index for using 'near' query
restaurantSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Restaurant', restaurantSchema);
