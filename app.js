// Archivo principal del Backend, configuración del servidor
// y otras opciones
var express         = require("express"),// Express: Framework HTTP para Node.js
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');  // Mongoose: Libreria para conectar con MongoDB
    logger = require('morgan');
    path = require('path');
    favicon = require('serve-favicon');
    crypto = require('crypto');
    cookieParser = require('cookie-parser');
    passport = require('passport'); // Passport: Middleware de Node que facilita la autenticación de usuarios
    session = require('express-session');
    formidable = require('formidable'),


require('mongoose-middleware').initialize(mongoose);
// Conexión a la base de datos de MongoDB que tenemos en local
mongoose.connect('mongodb://localhost/users', function(err, res) {
    if(err) throw err;
    console.log('Conectado con éxito a la Base de Datos');
});

// Iniciamos la aplicación Express
var app = express();
app.all('/*', function(req, res, next) {
    // CORS headers
    res.header("Access-Control-Allow-Origin", "*"); // restrict it to the required domain
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
// Configuración (sistema de plantillas, directorio de vistas,...)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

// Middlewares de Express que nos permiten enrutar y poder
// realizar peticiones HTTP (GET, POST, PUT, DELETE)
//Funciones importantes para subir archivos
app.use(bodyParser());
app.use(bodyParser({uploadDir:'./images'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());
// Ruta de los archivos estáticos (HTML estáticos, JS, CSS,...)
app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
// Indicamos que use sesiones, para almacenar el objeto usuario
// y que lo recuerde aunque abandonemos la página
app.use(session({ secret: 'zasentodalaboca' })); // session secret
// Configuracion de Passport. Lo inicializamos y le indicamos que Passport maneje la Sesion
app.use(passport.initialize());
app.use(passport.session());



// Importamos Models and controllers
var models     = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/users');
// Importamos el modelo usuario y la configuración de passport
require('./passport')(passport);
console.log (models);
// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);
// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/#app/home', failureRedirect: '/' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/login'
app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/#app/home', failureRedirect: '/' }
));
// API routes
var users = express.Router();

users.route('/users')
    .get(UserCtrl.findAllUsers)
    .post(UserCtrl.addUser);

users.route('/users/:id')
    .get(UserCtrl.findById)
    .put(UserCtrl.updateUser)
    .delete(UserCtrl.deleteUser);
users.route('/users/login')
    .post(UserCtrl.loginUser);
users.route('/users/upload/:username')
    .put(UserCtrl.upload);
users.route('/users/provider/facebook')
    .get(UserCtrl.findFacebook);
users.route('/users/provider/twitter')
    .get(UserCtrl.findTwitter);
app.use('/api', users);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});