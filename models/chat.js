var mongoose = require('mongoose');
Schema   = mongoose.Schema;
var ChatSchema = new Schema({

    imageUrl: {type: String},
    id: {type: String},
    user: {type: String},
    msg :  {type: String},
    date: {type: String}

});

module.exports = mongoose.model('Chat', ChatSchema);
