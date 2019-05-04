const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    privileged: {
        type: Boolean,
        default: false
    },
    admin: {
        type: Boolean,
        required: false
    },
    address: {
        type: [
            {
                houseNo: {
                    type: Number,
                    required: true
                },
                roadNo: {
                    type: Number,
                    required: true
                },
                area: {
                    type: String,
                    required: true
                },
                district: {
                    type: String,
                    required: true
                },
                country: {
                    type: String,
                    required: false
                }
            }
        ],
        required: false,
        default: []
    },
    cart: {
        type: [Schema.Types.Mixed],
        required: false,
        default: []
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);
