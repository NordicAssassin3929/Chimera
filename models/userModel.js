const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: String,
        email: String,
        password: String
    }
);

const UserModel = mongoose.model('UserModel', userSchema, "users");

module.exports = UserModel
