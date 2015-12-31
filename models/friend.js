var mongoose = require('mongoose');
Schema   = mongoose.Schema;
var User = mongoose.model('User');

var FriendSchema = new Schema({
    username:    { type: String },
    friend: { type: Schema.ObjectId, ref: "User" }
});

module.exports = mongoose.model('Friend', FriendSchema);
