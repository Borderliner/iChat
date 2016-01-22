var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true
    },
    username: {
        type: String,
        trim: true
    },
    password: String,
    website: {
        type: String,
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

mongoose.model('User', UserSchema);
