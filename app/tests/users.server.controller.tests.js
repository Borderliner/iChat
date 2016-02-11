var app = require('../../server'),
    request = require('supertest'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

var user;

describe('User Controller Unit Tests:', function(){
    beforeEach(function(done){
        user = new User({
            firstName: 'Walter',
            lastName: 'White',
            username: 'walter',
            password: 'methcooker',
            email: 'walter@gmail.com',
            provider: 'local'
        });

        user.save(function(err){
            done();
        });
    });
    describe('Testing the GET method:', function(){
        it('should be able to retrieve the list of all users', function(done){
            request(app).get('/user/')
                .set('Accept', 'application/json')
                .expect('Content-Type', '/json/')
                .expect(200)
                .end(function(err, res){
                    res.body.should.be.an.Array;
                    res.body[0].should.have.property('username', user.username);
                    done();
                });
        });

        it('should be able to retrieve user by id', function(done){
            request(app).get('/user/' + user.id)
                .set('Accept', 'application/json')
                .expect('Content-Type', '/json/')
                .expect(200)
                .end(function(err, res){
                    res.body.should.be.an.Object;
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('username');
                    done();
                });
        });
    });

    describe('Testing the POST method:', function(){
        it('should be able to post a user to database', function(done){
            var user = {
                firstName: 'Skyler',
                lastName: 'White',
                username: 'skyler',
                password: 'skyskysky',
                email: 'skyler@gmail.com',
                provider: 'local'
            };

            request(app).post('/user')
            .type('json')
            .send(user)
            .expect(200)
            .end(function(err, res){
                res.body.should.be.an.Object;
                res.body.should.have.property('firstName');
                res.body.should.have.property('email');
                res.body.should.have.property('password');
                res.body.should.have.property('username');
                done();
            });
        })
    });

    describe('Testing the PUT method:', function(){
        it('should be able to modify user\'s data', function(done){
            var newEmail = {
                email: 'walter@yahoo.com'
            };
            request(app).put('/user/' + user.id)
            .type('json')
            .send(newEmail)
            .expect(200)
            .expect('Content-Type', '/json/')
            .end(function(err, res){
                res.body.should.be.an.Object;
                res.body.should.have.property('email', newEmail.email);
                done();
            });
        });
    })

    afterEach(function(done){
        User.remove(function(){
            done();
        });
    });
});
