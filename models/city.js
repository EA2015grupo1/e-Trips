var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var citySchema = new Schema({
    city:    { type: String },
    location: {type: [Number], index: "2d"}
});

module.exports = mongoose.model('City', citySchema);
