const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    county: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    unit: {
        type: String,
        required: true,
    },
    productionDate: {
        type: Date,
        required: true,
    },
    images: {
        type: Array,
        default: [],
        required: true,
    },
    homeDelivery: {
        type: Boolean,
        default: false,
        required: true,
    },
    pickup: {
        type: Boolean,
        default: false,
        required: true,
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    status: {
        type: String,
        default: 'în așteptare',
        required: true,
    },

}, { timestamps: true });

module.exports = mongoose.model('products', productSchema);