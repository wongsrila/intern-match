const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: false
    },
    user_type: {
        type: String,
        required: true
    },
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
module.exports = User;