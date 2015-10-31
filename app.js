var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    crypto = require('crypto');
    cookieParser = require('cookie-parser');

// Connection to DB
mongoose.connect('mongodb://localhost/usuarios', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

// Import Models and controllers
var models     = require('./models/usuario')(app, mongoose);
var TVUsuarioCtrl = require('./controllers/tvusuarios');

console.log (models);
/*// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);*/
// API routes
var tvusuarios = express.Router();

tvusuarios.route('/tvusuarios')
    .get(TVUsuarioCtrl.findAllTVUsuarios)
    .post(TVUsuarioCtrl.addTVUsuario);

tvusuarios.route('/tvusuarios/:id')
    .get(TVUsuarioCtrl.findById)
    .put(TVUsuarioCtrl.updateTVUsuario)
    .delete(TVUsuarioCtrl.deleteTVUsuario);
tvusuarios.route('/tvusuarios/login')
    .post(TVUsuarioCtrl.loginTVUsuario);

app.use('/api', tvusuarios);

// Carga una vista HTML
app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
// Start server
app.listen(8080, function() {
    console.log("Node server running on http://localhost:8080");
});