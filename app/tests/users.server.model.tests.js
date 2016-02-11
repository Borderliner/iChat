var app = require('../../server'),
    should = require('should'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

describe('User Model Unit Tests:', function(){
    describe('Testing the save method', function(){
        it('should be able to save a user without any problems', function(){
            var user = new User({
                firstName: 'Walter',
                lastName: 'White',
                username: 'walter',
                password: 'methcooker',
                email: 'walter@gmail.com',
                provider: 'local'
            });
            user.save(function(err){
                should.not.exist(err);
            });
        });

        it('should not register a user without username', function(){
            var user = new User({
                firstName: 'Walter',
                lastName: 'White',
                username: '',
                password: 'methcooker',
                email: 'walter@gmail.com',
                provider: 'local'
            });
            user.save(function(err){
                should.exist(err);
            });
        });

        it('should not register a user without first name', function(){
            var user = new User({
                firstName: '',
                lastName: 'White',
                username: 'walter',
                password: 'methcooker',
                email: 'walter@gmail.com',
                provider: 'local'
            });
            user.save(function(err){
                should.exist(err);
            });
        });

        it('should not register a user without email', function(){
            var user = new User({
                firstName: 'Walter',
                lastName: 'White',
                username: 'walter',
                password: 'methcooker',
                email: '',
                provider: 'local'
            });
            user.save(function(err){
                should.exist(err);
            });
        });

        it('should not register a user without password', function(){
            var user = new User({
                firstName: 'Walter',
                lastName: 'White',
                username: 'walter',
                password: '',
                email: 'walter@gmail.com',
                provider: 'local'
            });
            user.save(function(err){
                should.exist(err);
            });
        });
    });

    afterEach(function(done){
        User.remove(function(){
            done();
        });
    });
});
