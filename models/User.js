const mongoose = require('mongoose');
const validate = require('mongoose-validator');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            validate({
                validator: 'isEmail'
            })
        ]
    },
    password: {
        type: String,
        required: true,
    },

});

module.exports = mongoose.model('Users', UserSchema);