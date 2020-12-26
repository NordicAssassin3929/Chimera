const UserModel = require('../schemas/userModel');
const Helper = require('./helper');
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

    static async checkIfUserExists(email) {
        let searchQuery = { email: email }
        let userExists = await UserModel.exists(searchQuery)
        console.log('WHAT: ' + userExists)
        return {userExists}
     }

    static async getUserId(email) {
        let id = null
        let user = await UserModel.findOne({email})
        id = user._id
        let password = user.password
        console.log('getUserId: ' + id)
        return {email, id, password} 
    }
}