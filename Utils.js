let client = require('./redis');

let ctrl = {
    checkCache : function (req, res, next){
        const searchId = req.body.search;
        client.get(searchId, (err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            if (data != null) {
                res.json({ status:'OK', data: data });
            } else {
                //proceed to next middleware function
                next();
            }
        });
    },
};
module.exports = ctrl;