var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var collegeSchema = new Schema({
    city:    { type: String },
    college:    {type: String },
    location: {type: [Number], index: "2d"}
});

module.exports = mongoose.model('College', collegeSchema);
