var mongoose = require('mongoose');
    Schema   = mongoose.Schema;
var User = mongoose.model('User');
var College = mongoose.model('College');

var forumSchema = new Schema({
                universidad: {type: Schema.ObjectId, ref: "College"},
                topics: [{
                        usercreator: {type: Schema.ObjectId, ref: "User"},
                        titulo: { type: String },
                        posts: [{
                                mensaje: { type: String },
                                username: {type: Schema.ObjectId, ref: "User"}
                        }]
                }]
        });

module.exports = mongoose.model('Forum', forumSchema);
