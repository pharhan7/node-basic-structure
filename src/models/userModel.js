const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
},{
    timestamps: true,
    strict: false,
    collection: 'users'
});

const User = mongoose.model('User', userSchema);

module.exports = User;