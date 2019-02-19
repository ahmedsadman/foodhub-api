const User = require('../models/user');

exports.userLogin = (req, res, next) => {
    res.send({
        message: 'Hello World'
    });
};

exports.userRegister = async (req, res, next) => {
    const { username, password, email } = req.body;

    try {
        const user = new User({
            username,
            password,
            email
        });

        const response = await user.save();

        res.status(201).send({
            message: 'User created',
            _id: response._id,
            email: response.email
        });
    } catch (e) {
        res.status(500).send({
            message: 'Error occured',
            error: e
        });
    }
};
