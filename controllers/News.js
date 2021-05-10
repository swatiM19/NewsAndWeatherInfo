const axios = require('axios');
const NewsAPI = require('newsapi');
const _ = require('lodash');

const client = require('../redis');
const secret = require('../secrets');
const newsapi = new NewsAPI(secret.newsapi);


let ctrl = {
    topHeadlines: async function(req, res){
        try {
            newsapi.v2.topHeadlines({
                sources: 'bbc-news,the-verge',
                q: 'bitcoin',
                category: 'business',
                language: 'en',
                country: 'us'
            }).then(response => {
                res.json({ status:'OK', data: response });
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
                // add data to Redis
                client.setex(search, 3600, JSON.stringify(response));
                res.json({ status:'OK', data: response });
            });
        } catch (error) {
            res.json({message: error});
        }
    },
    getWeatherInfo: async function(req,res) {
        // waiting for API to activate
        try {
            let apiKey = secret.weatherapi;
            let city = req.body.city || 'bengaluru';
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
            const weatherAPI = await axios.get(url);
            console.log('weatherAPI', weatherAPI);
            res.json({data:weatherAPI});
        } catch (error) {
            console.log('error:', error);
        }
    }
};
module.exports = ctrl;