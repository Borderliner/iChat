var app = require('../../server'),
    should = require('should'),
    request = require('supertest');

describe('Routing Unit Tests:', function(){
    describe('Testing Static Pages:', function(){
        it('should retrieve homepage', function(done){
            request(app).get('/')
                .expect(200)
                .expect('Content-Type', '/html/')
                .end(function(err, res){
                    res.status.should.be.exactly(200);
                    done();
                });
        });

        it('should retrieve signup page', function(done){
            request(app).get('/signup')
                .expect(200)
                .expect('Content-Type', '/html/')
                .end(function(err, res){
                    res.status.should.be.exactly(200);
                    done();
                });
        });

        it('should retrieve signin page', function(done){
            request(app).get('/signin')
                .expect(200)
                .expect('Content-Type', '/html/')
                .end(function(err, res){
                    res.status.should.be.exactly(200);
                    done();
                });
        });

        it('should retrieve chat page', function(done){
            request(app).get('/chat')
                .expect(200)
                .expect('Content-Type', '/html/')
                .end(function(err, res){
                    res.status.should.be.exactly(200);
                    done();
                });
        });
    });
});
