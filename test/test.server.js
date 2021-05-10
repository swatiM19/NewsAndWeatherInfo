const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const request = require('supertest');
const secret = require('../secrets');
const server = 'http://localhost:3002';

chai.use(chaiHttp);


describe('Test ALL news and weather APIs', function() {

    it('Should get all the weather information return success', function(done) {
        request(server)
            .post('/news/getWeatherInfo')
            .set('Authorization', secret.auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });

    it('Should return news based on search', function(done) {
        request(server)
            .post('/news/searchHeadline')
            .send({ search:'bitcoin'})
            .set('Authorization', secret.auth)
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200).end(function(err,res){
                res.status.should.equal(200);
                done();
            });
    });
});
