var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var citySchema = new Schema({
    city:    { type: String }
});

module.exports = mongoose.model('City', citySchema);
