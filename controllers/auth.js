const User = require('../models/user');

exports.userLogin = async (req, res, next) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ username, password }, 'username email address privileged');
        if (user) {
            res.send({
                message: 'Success',
                found: true,
                data: user
            });
        } else {
            res.send({
                message: 'Username/password is invalid',
                found: false
            });
        }
    } catch (e) {
        console.log('error occured');
        res.status(400).send({
            message: 'Request error',
            error: e
        });
    }
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
        console.log(e.message);
        res.status(400).send({
            message: 'Error occured',
            error: e
        });
    }
};
