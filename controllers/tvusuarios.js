//File: controllers/tvshows.js
var mongoose = require('mongoose');
var TVUsuario  = mongoose.model('TVUsuario');

//GET - Return all tvusuarios in the DB
exports.findAllTVUsuarios = function(req, res) {
    TVUsuario.find(function(err, tvusuarios) {
        if(err) res.send(500, err.message);

        console.log('GET /tvusuarios')
        res.status(200).jsonp(tvusuarios);
    });
};

//GET - Return a TVUsuario with specified ID
exports.findById = function(req, res) {
    TVUsuario.findById(req.params.id, function(err, tvusuario) {
        if(err) return res.send(500, err.message);

        console.log('GET /tvusuario/' + req.params.id);
        res.status(200).jsonp(tvusuario);
    });
};

//POST - Insert a new TVUsuario in the DB
exports.addTVUsuario = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var hash = crypto
        .createHash("md5")
        .update(req.body.password)
        .digest('hex');

    req.body.password = hash
    var tvusuario = new TVUsuario({
        username:    req.body.username,
        password: 	  req.body.password,
        name:   req.body.name,
        email:   req.body.email

    });

    tvusuario.save(function(err, tvusuario) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(tvusuario);
    });
};

//PUT - Update a register already exists
exports.updateTVUsuario = function(req, res) {
    TVUsuario.findById(req.params.id, function(err, tvusuario) {
        var hash = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest('hex');

        req.body.password = hash

        tvusuario.username = req.body.username;
        tvusuario.password    = req.body.password;
        tvusuario.name = req.body.name;
        tvusuario.email  = req.body.email;

        tvusuario.save(function(err) {
            if(err) return res.send(500, err.message);
            res.status(200).jsonp(tvusuario);
        });
    });
};
var resultado;
exports.loginTVUsuario = function(req, res) {
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
    TVUsuario.find(username, function (err, tvusuario) {
       var user = JSON.stringify(tvusuario);
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

//DELETE - Delete a TVUsuario with specified ID
exports.deleteTVUsuario = function(req, res) {
    return TVUsuario.findById(req.params.id, function (err, tvusuario) {
        console.log('DELETE usuario');
        return tvusuario.remove(function (err) {
            if (!err) {
                console.log("usuario eliminado");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}

