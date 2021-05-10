const jwt = require('jsonwebtoken');
const keys = require('../secrets');

let ctrl = {
    ensureAuthentic: function(req, res, next) {
        const token = req.headers['authorization'];
        try {
            const user = jwt.verify(token , keys.secretkey);
            req.user = user;
            next();
        } catch(error) {
            res.json({ status : 'error', message: error });
        }
    }
};

module.exports = ctrl;