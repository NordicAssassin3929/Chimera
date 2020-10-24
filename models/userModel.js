const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        _id: mongoose.Types.ObjectId,
        email: String,
        password: String
    }
);

const UserModel = mongoose.model('UserModel', userSchema, "users");

module.exports = UserModel
