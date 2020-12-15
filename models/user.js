const UserModel = require('../schemas/userModel');
ObjectId = require('mongodb').ObjectID;

module.exports = class User {
    static async createUser(user) {
        let userObj = {
            'email': user.email,
            'password': user.password
        };

        CartModel.updateOne(
            {
                $push: {
                    user: userObj
                }
            },
            {upsert: true, new: true},
            function (error, success) {
                if (error) {
                    console.log(error)
                } else {
                    console.log(success)
                }
            }
        );
    }
}