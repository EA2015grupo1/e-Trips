var mongoose = require('mongoose');
Schema   = mongoose.Schema;
var Release = mongoose.model('Release');
var User = mongoose.model('User');

var CommentSchema = new Schema({
    user:    { type: Schema.ObjectId, ref: "User"},
    comment :  {type: String},
    createdAt: {type: Date, default: Date.now},
    release:  { type: Schema.ObjectId, ref: "Release"}

});

module.exports = mongoose.model('Comment', CommentSchema);
