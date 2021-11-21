const mongoose = require('mongoose');

const User = new mongoose.Schema({
    firstName: {type: String, required: true},
    familyName: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true},
    role: {type: String, default: 'user'},
    following: [
        {type: mongoose.Schema.Types.ObjectId, ref: 'Vacation'}
    ]
})

module.exports = mongoose.model('User', User);