var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;

var tvusuarioSchema = new Schema({
    username:    { type: String },
    password:    { type: String },
    name:  { type: String },
    email:   { type: String }
});

module.exports = mongoose.model('TVUsuario', tvusuarioSchema);
