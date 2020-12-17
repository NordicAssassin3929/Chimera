const UserModel = require('../schemas/userModel');
ObjectId = require('mongodb').ObjectID;

module.exports = class User {

    constructor(email,
        password, dob) {
        this.email = email;
        this.password = password;
        this.dob = dob;
    }

    static async createUser(user) {
        UserModel.create(
            {
                'email': user.email,
                'password': user.password,
                'dob': user.dob
            },
            // {upsert: true, new: true},
            function (error, success) {
                if (error) {
                    console.log('error: ' + error)
                } else {
                    console.log('success: ' + success)
                }
            }
        );
    }

    static async getUserId(email) {
        let id = null
        let user = await UserModel.findOne({email})
        id = user._id
        console.log('getUserId: ' + id)
        return id 
    }
}