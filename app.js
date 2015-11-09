var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');
    logger = require('morgan');
    path = require('path');
    favicon = require('serve-favicon');
    crypto = require('crypto');
    cookieParser = require('cookie-parser');

// Connection to DB
mongoose.connect('mongodb://localhost/users', function(err, res) {
    if(err) throw err;
    console.log('Connected to Database');
});

// Middlewares
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(cookieParser());

// Import Models and controllers
var models     = require('./models/user')(app, mongoose);
var UserCtrl = require('./controllers/users');

console.log (models);
// Example Route
var router = express.Router();
router.get('/', function(req, res) {
    res.send("Hello world!");
});
app.use(router);

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

app.use('/api', users);

app.get('*', function(req, res) {
    res.sendfile('./public/index.html');
});
// Start server
app.listen(3000, function() {
    console.log("Node server running on http://localhost:3000");
});