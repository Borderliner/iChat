var mongoose = require('mongoose'),
    crypto = require('crypto');
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
    },
    salt: {
        type: String
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerId: String,
    providerData: {},
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
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

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
    return this.password === this.hashPassword(password);
};

UserSchema.path('password').validate(function(password){
    if(password.length > 32 || password.length < 6){
        return 'Password must be between 6 and 32 characters';
    }
    else {
        return password;
    }
});

UserSchema.pre('save', function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
    var _this = this;
    var possibleUsername = username + (suffix || '');

    _this.findOne({username: possibleUsername}, function(err, user){
        if(!err){
            if(!user){
                callback(possibleUsername);
            }
            else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        }
        else{
            callback(null);
        }
    });
};

mongoose.model('User', UserSchema);
