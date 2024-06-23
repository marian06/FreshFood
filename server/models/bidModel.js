const mongoose = require('mongoose');
const bidSchema = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'products',
    },
    seller:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    buyer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    },
    ammount:{
        type: Number,
        required: true
    },
    mobile:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        default: 'nefinalizată',
        required: true
    },
    message:{
        type: String,
    }
}, {timestamps: true});

module.exports = mongoose.model('bids', bidSchema);
