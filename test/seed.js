const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const secret = require('../secrets');
const { User } = require('../models/User');

const userA = new ObjectID();
const userB = new ObjectID();

// tokens: [{
//     access: 'auth',
//     token: jwt.sign({_id: userOne, access: 'auth'}, secret.secretkey).toString()
// }

const users = [{
    _id: userA,
    email: 'userOne@gmail.com',
    password: '12345678'
}, {
    _id: userB,
    email: 'userTwo@gmail.com',
    password: '12345678',
}];


let addSampleUsers = (done) => {
    User.deleteMany({}).then(() => {
        let userA = new User(users[0]).save();
        let userB = new User(users[1]).save();

        return Promise.all([userA, userB]);
    }).then(() => done());
};

module.exports = {
    users,
    addSampleUsers
};