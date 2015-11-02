//File: controllers/users.js
var mongoose = require('mongoose');
var User  = mongoose.model('User');

//GET - Return all Users in the DB
exports.findAllUsers = function(req, res) {
    User.find(function(err, users) {
        if(err) res.send(500, err.message);

        console.log('GET /users')
        res.status(200).jsonp(users);
    });
};

//GET - Return a User with specified ID
exports.findById = function(req, res) {
    TVUsuario.findById(req.params.id, function(err, user) {
        if(err) return res.send(500, err.message);

        console.log('GET /user/' + req.params.id);
        res.status(200).jsonp(user);
    });
};
var resultado;
var request;
var username;
//POST - Insert a new User in the DB
exports.addUser = function(req, res) {
    console.log('POST');
    console.log(req.body);
    resultado = res;
    request= req;
    var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');
    req.body.password = hash
    var u=[];
    var u1;
    var u2;
    username = req.body.username;
    User.find(username, function (err, user) {
        console.log (user);
        if (user=="") {
            u1 = '"' + req.body.username + '"';
            checkreg(u1, u2);
        }
        else {
            var user = JSON.stringify(user);
            var res = user.split(",");
            u = res[1].split(":");
            u2 = u[1];
            u1 = '"' + req.body.username + '"';
            checkreg(u1, u2);
        }

    });

};

function checkreg (u1, u2){

    if (u1==u2){
        return resultado.status(409).jsonp("usuario " +username + " ya existe");
    }
    else{
        var user = new User({
            username:    request.body.username,
            password: 	  request.body.password,
            name:   request.body.name,
            email:   request.body.email,
            rolename: "registrado",

        })

        user.save(function(err, user) {
            if(err) return res.send(500, err.message);
            resultado.status(200).jsonp(user);
        });

    }
};

//PUT - Update a register already exists
exports.updateUser = function(req, res) {
   User.findById(req.params.id, function(err,user) {
        var hash = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest('hex');

        req.body.password = hash

        user.username = req.body.username;
        user.password    = req.body.password;
        user.name = req.body.name;
        user.email  = req.body.email;
        user.rolename = "registrado";

      user.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(user);
        });
    });
};
//POST - login User
exports.loginUser = function(req, res) {
    if (!req.body.username || !req.body.password) {
        res.send('username and password cannot be null.');
        return;
    }
    resultado = res;
    var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');
    var key=[];
    var p1;
    var p2;
    req.body.password = hash
   var username = req.body.username;
    User.find(username, function (err, user) {
       var user = JSON.stringify(user);
        var res = user.split(",");
        key = res[2].split(":");
        p2 = key[1];
        p1 = '"'+req.body.password+'"';
        goal (p1, p2, username);

        });

};

function goal (p1, p2, username){
    if (p1==p2){
        return resultado.status(200).jsonp({"loginSuccessful":true, "username": username });
    }
    else{
        return resultado.status(200).jsonp({"loginSuccessful":false, "username": username});
    }
};

//DELETE - Delete a User with specified ID
exports.deleteUser = function(req, res) {
    return User.findById(req.params.id, function (err, user) {
        console.log('DELETE usuario');
        return user.remove(function (err) {
            if (!err) {
                console.log("usuario eliminado");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

