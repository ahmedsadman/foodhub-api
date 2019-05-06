const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const orderSchema = new Schema({
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    items: {
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
                },
                quantity: {
                    type: Number,
                    required: true
                }
            }
        ],
        validate: v => v == null || v.length > 0,
        required: true
    },
    restaurant: {
        type: ObjectId,
        required: true,
        ref: 'Restaurant'
    },
    total_amount: {
        type: Number,
        required: true
    },
    delivery_address: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);
