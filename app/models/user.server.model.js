var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true,
        required: false
    },
    email: {
        type: String,
        trim: true,
        index: true,
        required: true,
        match: /.+\@.+\..+/
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User']
    }
    website: {
        type: String,
        required: false,
        get: function(url){
            if(!url){
                return url;
            }
            else {
                if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
                    url = 'http://' + url;
                }
                return url;
            }
        }
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});
UserSchema.set('toJSON', {getters: true});
UserSchema.virtual('fullName')
    .get(function(){
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName){
        var splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

UserSchema.statics.findOneByUsername = function(username, callback){
    this.findOne({username: new RegExp(username, 'i')}, callback);
};

UserSchema.methods.authenticate = function(password){
    return this.password === password;
};

UserSchema.path('password').validate(function(password){
    if(password.length > 32 || password.length < 6){
        return 'Password must be between 6 and 32 characters';
    }
    else {
        return password;
    }
});

mongoose.model('User', UserSchema);
