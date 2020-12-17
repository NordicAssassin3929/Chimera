const User = require('../models/user');

// login
exports.getUser = async(req, res, next) => {
    email = req.params.email
    let id = null;
    await User.getUserId(email)
    .then(result => id = result)
    console.log('user_id : ' + id)
    res.send(id)
}

// registration
exports.createUser = (req, res, next) => {
    const addedUser = new User(
        req.body.email,
        req.body.password,
        req.body.dob)
    User.createUser(addedUser)
    .then(r => console.log('r ' + r));
}