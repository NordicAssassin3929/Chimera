const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        email: String,
        password: String,
        dob: String
    }
);

const UserModel = mongoose.model('UserModel', userSchema, "users");

module.exports = UserModel
