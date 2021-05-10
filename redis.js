let redis = require('redis').createClient(6379, '127.0.0.1');

redis.on('connect', function () {
    console.log('Connected to Redis');
});

redis.on('error', (err) => {
    console.log('Error' + err);
});


module.exports = redis;