const mongoose = require('mongoose');

const Vacation = new mongoose.Schema({
    destination: {type: String, required: true},
    country: {type: String, required: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    dateFrom: {type: Date, required: true},
    dateTo: {type: Date, required: true},
    followers: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
    ]
});

module.exports = mongoose.model('Vacation', Vacation);
