var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var forumSchema = new Schema({
        foro: {
                universidad: {type: Schema.ObjectId, ref: "College"},
                topics: [{
                        usercreator: {type: Schema.ObjectId, ref: "User"},
                        titulo: String,
                        posts: [{
                                mensaje: String,
                                username: {type: Schema.ObjectId, ref: "User"}
                        }]
                }]
        }
        });

module.exports = mongoose.model('Forum', forumSchema);
