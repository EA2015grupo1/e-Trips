var mongoose = require('mongoose');
Schema   = mongoose.Schema;
var User = mongoose.model('User');

var ReleaseSchema = new Schema({
    receiver:    { type: String},
    sender: {type: Schema.ObjectId, ref: "User"},
    text :  {type: String},
    createdAt: {type: Date, default: Date.now},

});

module.exports = mongoose.model('Release', ReleaseSchema);
