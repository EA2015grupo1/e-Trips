var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    username:    { type: String },
    password:    { type: String },
    name:  { type: String },
    email:   { type: String },
    rolename: {type: String}
});

module.exports = mongoose.model('User', userSchema);
