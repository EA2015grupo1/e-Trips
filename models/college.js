var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var collegeSchema = new Schema({
    city:    { type: String },
    college:    { type: String },
    url:  { type: String }
});

module.exports = mongoose.model('College', collegeSchema);
