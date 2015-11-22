var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var userSchema = new Schema({
    username:    { type: String },
    password:    { type: String },
    name:  { type: String },
    email:   { type: String },
    phone:   { type: String },
    gender:   { type: String },
    zipCode:   { type: String },
    city:   { type: String },
    rol: {type: String},
    provider: String,
    provider_id: {type: String, unique: true},
    imageUrl: {type: String},
    createdAt: {type: Date, default: Date.now}

});

module.exports = mongoose.model('User', userSchema);
