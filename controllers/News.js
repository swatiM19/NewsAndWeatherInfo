const NewsAPI = require('newsapi');
const _ = require('lodash');
const request = require('request');

const client = require('../redis');
const secret = require('../secrets');
const newsapi = new NewsAPI(secret.newsapi);


let ctrl = {
    topHeadlines: async function(req, res){
        try {
            newsapi.v2.topHeadlines({
                language: 'en',
            }).then(response => {
                return res.status(200).json({ result: 'success', data:response });
            });
        } catch (error){
            res.json({message: error});
        }
    },
    searchHeadline: async function(req, res){
        try {
            if (_.isEmpty(req.body.search)){
                return res.json({status:'error', message:'Please provide search value'});
            }
            let search = req.body.search ;
            newsapi.v2.everything({
                q: search ,
            }).then(response => {
                if (_.isEmpty(response)) {
                    return res.status(200).json({ result: 'success', data: {} , message: 'No data'});
                }
                // add data to Redis
                client.setex(search, 3600, JSON.stringify(response));
                let newsData = {
                    count:'',
                    data: [],
                };
                newsData.count = response.totalResults;
                newsData.data.push( response.articles.map(val =>
                    ({ 'headline': val.title,
                        'link': val.url,
                        'author': val.author,
                        'description': val.description,
                        'publishedAt': val.publishedAt,
                    })));
                return res.status(200).json({ result: 'success', data:newsData });
            });
        } catch (error) {
            res.json({message: error});
        }
    },
    getWeatherInfo: async function(req,res) {
        try {
            let apiKey = secret.weatherapi;
            let city = req.body.city || 'bengaluru';
            let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&cnt=5`;
            request(url, function (err, response, body) {
                if(err){
                    console.log('error:', err);
                } else {
                    if (_.isEmpty(body)) {
                        return res.status(200).json({ result: 'success', data: {} , message: 'No data'});
                    }
                    let resultData = JSON.parse(body);
                    let obj = {
                        count: resultData.cnt,
                        unit: 'metric',
                        location: city,
                        data: []
                    };
                    obj.data.push( resultData.list.map(val =>
                        ({ 'date': val.dt_txt,
                            'main': val.weather[0].main,
                            'temp': val.main.temp,
                        })));
                    return res.status(200).json({ result: 'success', data:obj });
                }
            });

        } catch (error) {
            console.log('error:', error);
        }
    }
};
module.exports = ctrl;