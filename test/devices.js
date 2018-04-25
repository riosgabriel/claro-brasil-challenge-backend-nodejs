'use strict';

const chai = require('chai'),
    chaiHttp = require('chai-http');

const should = chai.should();

const mock = require('mock-require');

mock('../lib/database.js', require('../mocks/database.js'));

const app = require('../index.js');

chai.use(chaiHttp);

describe('Devices API', function() {
    this.timeout(5000);

    // DELETE - Delete a device
    it('should delete a device', function(done) {
        chai.request(app)
            .delete('/users/2/devices/1')
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Device deleted');
                done();
            });
    });

    it('should create a device', function(done) {
        chai.request(app)
            .post('/users/1/devices/')
            .send({
                device: {
                    name: "Nexus 6p",
                    model: "Android"
                }
            })
            .end(function(err, res){
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Device created');
                done();
            });
    });

    it('should not create a device if limit reached', function(done) {
        chai.request(app)
            .post('/users/3/devices/')
            .send({
                device: {
                    name: "Nexus 6p",
                    model: "Android"
                }
            })
            .end(function(err, res){
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Device limit reached');
                done();
            });
    });
});