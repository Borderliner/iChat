//Requirements
var mongoose = require('mongoose'),
    crypto = require('crypto'),
    Schema = mongoose.Schema;

//User Schema structure
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
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'User'] //A User can be an Admin, or a simple User
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
        required: false
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: Date
});

/////Methods

/* function authenticate(password)
 * It matches the received password with the user's hashed password
 */
UserSchema.methods.authenticate = function(password){
    return this.password === this.hashPassword(password);
};

/* function hashPassword(password)
 * It simply hashes the password using nodejs's crypto library
 */
UserSchema.methods.hashPassword = function(password){
    return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

/////Statics

/* function findOneByUsername(username)
 * It finds a User by it's username field
 */
UserSchema.statics.findOneByUsername = function(username, callback){
    this.findOne({username: new RegExp(username, 'i')}, callback);
};

/* function findUniqueUsername(username)
 * It finds an available Username for new users
 */
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

//Field Validations
UserSchema.path('password').validate(function(password){
    if(password.length > 32 || password.length < 6){
        return 'Password must be between 6 and 32 characters';
    }
    else {
        return password;
    }
});

//Getters and Setters
UserSchema.set('toJSON', {
    getters: true,
    virtuals: true
});

//Format website field if it does not contain http:// prefix
UserSchema.path('website').get(function(url){
    if(!url){
        return url;
    }
    else {
        if(url.indexOf('http://') !== 0 && url.indexOf('https://') !== 0){
            url = 'http://' + url;
        }
        return url;
    }
});

//Vritual Fields
UserSchema.virtual('fullName')
    .get(function(){
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(fullName){
        var splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

//Pre functions
UserSchema.pre('save', function(next){
    if(this.password){
        this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
        this.password = this.hashPassword(this.password);
    }
    next();
});

//Register the UserSchema as User to mongoose
mongoose.model('User', UserSchema);
