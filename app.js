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
mongoose.connect('mongodb://localhost/etrips', function(err, res) {
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

// Middlewares de Express que nos permiten enrutar y poder realizar peticiones HTTP (GET, POST, PUT, DELETE)
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


// Indicamos que use sesiones, para almacenar el objeto usuario y que lo recuerde aunque abandonemos la página
app.use(session({ secret: 'zasentodalaboca' })); // session secret


// Configuracion de Passport. Lo inicializamos y le indicamos que Passport maneje la Sesion
app.use(passport.initialize());
app.use(passport.session());

// API Rutas
routes = require('./routes/users')(app);
routes = require('./routes/cities')(app);
routes = require('./routes/colleges')(app);
routes = require('./routes/friends')(app);
routes = require('./routes/forums')(app);
routes = require('./routes/requests')(app);
routes = require('./routes/messages')(app);
routes = require('./routes/releases')(app);
routes = require('./routes/comments')(app);



require('./passport')(passport);
var router = express.Router();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(router);
// Ruta para autenticarse con Twitter (enlace de login)
app.get('/auth/twitter', passport.authenticate('twitter'));
// Ruta para autenticarse con Facebook (enlace de login)
app.get('/auth/facebook', passport.authenticate('facebook'));
// Ruta de callback, a la que redirigirá tras autenticarse con Twitter.
// En caso de fallo redirige a otra vista '/'
app.get('/auth/twitter/callback', passport.authenticate('twitter',
    { successRedirect: '/#app/enter', failureRedirect: '/' }
));
// Ruta de callback, a la que redirigirá tras autenticarse con Facebook.
// En caso de fallo redirige a otra vista '/'
app.get('/auth/facebook/callback', passport.authenticate('facebook',
    { successRedirect: '/#app/enter', failureRedirect: '/' }
));

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});



//WebSockets
var nicknames = [];
io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.on('sendMessage', function(data) {
        console.log (data);
        io.sockets.emit('newMessage', {msg: data.message, user: data.user, imageUrl: data.imageUrl, date: data.date, city: data.city, college: data.college, email: data.email});
    });
    socket.on('newUser', function(data){

        var user_exists = false;
        for (var i=0; i<nicknames.length; i++) {
            if (nicknames[i].user == data.user) {
                user_exists = true;
                break;
            }
         }
        if (!user_exists){
            socket.user = data.user;
            nicknames.push (data);

        }
        console.log (nicknames);
        io.sockets.emit('usernames', nicknames);


    });
    socket.on('disconnect', function(){
        console.log('Alguien se ha desconectado con Sockets');
        logout({'user': socket.user});
        console.log(socket.user+ ' has disconnected');
    });
    function logout (data) {
        for (var i=0; i<nicknames.length; i++) {
            if (nicknames[i].user == data.user) {
                s = nicknames.splice(i, 1);
                break;
            }
        }
        console.log (nicknames);
        io.sockets.emit('usernames', nicknames);
    }
});


// Start server
server.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});

