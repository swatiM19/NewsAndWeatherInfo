const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../secrets');

let ctrl = {
    register: async function (req, res) {
        console.log('req.body', req.body);
        const { email, password: plainText } = req.body;
        if (!email || typeof email !== 'string') {
            return res.json({ status: 'error', error: 'Invalid email' });
        }

        if (!plainText || typeof plainText !== 'string') {
            return res.json({ status: 'error', error: 'Invalid password' });
        }
        if (plainText.length < 5) {
            return res.json({
                status: 'error',
                error: 'Password too small. Should be at least 8 characters'
            });
        }
        const password = await bcrypt.hash(plainText, 10);
        try {
            const response = await User.create({ email, password});
            console.log('User created successfully', response);
        } catch (error) {
            console.log(error);
            if (error.code === 11000){
                return res.json({status: 'error', message: 'Email already exists.'});
            }
        }
        res.json({ status: 'OK'});
    },
    login: async function (req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (!user) {
            return res.json({status: 'error', message: 'Invalid email/password'});
        }
        if ( await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ id: user._id, email: user.email}, keys.secretkey);
            console.log('token', token);
            return res.json({ status: 'login successful', data: token});
        }
        res.json({ status: 'error', error: 'Invalid username/password' });
    },
    logout: function () {
        // we can handle logout from client side
    }

};

module.exports = ctrl;