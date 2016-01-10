module.exports = function (app) {

    var mongoose = require('mongoose');
    var User = require('../models/user.js');

    //GET - GET All Users By College with pagination
    findGenderUsers = function (req, res) {
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };

        User
            .find({gender: req.params.gender})
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, users) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {

                    // for

                    res.jsonp(users);
                }
            });

    };

    //GET - GET All Users By College with pagination
    findCollegeUsers = function (req, res) {
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };

        User
            .find({college: req.params.college})
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, users) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
            });

    };
    //GET - GET All Users By College with pagination
        AllGender = function (req, res) {
            User.find({gender: req.params.gender},function (err, users) {
                if (err) res.send(500, err.message);

                console.log('GET /gender')
                res.status(200).jsonp(users);
            });
        };
    //GET - GET All Users By College with pagination
    AllUsers = function (req, res) {
        User.find(function (err, users) {
            if (err) res.send(500, err.message);

            console.log('GET /users')
            res.status(200).jsonp(users);
        });
    };

    //GET -  GET All Users with pagination
    findAllUsers = function (req, res) {
        var count = req.query.count || 5;
        var page = req.query.page || 1;

        var filter = {
            filters: {
                mandatory: {
                    contains: req.query.filter
                }
            }
        };

        var pagination = {
            start: (page - 1) * count,
            count: count
        };

        var sort = {
            sort: {
                desc: '_id'
            }
        };

        User
            .find()
            .filter(filter)
            .order(sort)
            .page(pagination, function (err, users) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(users);
                }
            });

    };

    //GET - Return a User with specified ID
    findById = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    };

    //GET - Return a User with Provider Twitter
    findTwitter = function (req, res) {
        User.findOne({provider: 'twitter'}, function (err, user) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/');
            res.status(200).jsonp(user);
        });
    };

    //GET - Return a User with Provider Facebook
    findFacebook = function (req, res) {
        var facebook = "facebook";
        User.findOne({provider: facebook}, function (err, user) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(user);
        });
    };
    var resultado;
    var request;
    var username;
    var fs = require('fs');
    var filename;
    var imagen;

    //PUT- Funcion para subir la foto al servidor
    uploadimage = function (req, res) {
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            var tmp_path = files.file.path;
            var tipo = files.file.type;//tipo del archivo

            if (tipo == 'image/png' || tipo == 'image/jpg' || tipo == 'image/jpeg') {
                //Si es de tipo png jpg o jpeg
                var aleatorio = Math.floor((Math.random() * 9999) + 1);//Variable aleatoria
                filename = aleatorio + "" + files.file.name;//nombre del archivo mas variable aleatoria

                var target_path = './public/assets/images/' + filename;// hacia donde subiremos nuestro archivo dentro de nuestro servidor
                fs.rename(tmp_path, target_path, function (err) {//Escribimos el archivo
                    fs.unlink(tmp_path, function (err) {//borramos el archivo tmp
                        //damos una respuesta al cliente
                        console.log('<p>Imagen subida OK</p></br><img  src="./images/' + filename + '"/>');
                    });

                });

                var u = req.params.username;
                User.findOne({username: u}, function (err, user) {
                    imagen = "http://localhost:3000/assets/images/" + filename;
                    console.log ("usuario: " + user);
                    user.imageUrl = imagen;

                    user.save(function (err) {
                        if (err) return res.send(500, err.message);
                        res.status(200).jsonp(user);
                    });
                });

            } else {
                console.log('Tipo de archivo imagen no soportada');
            }

            if (err) {
                console.error(err.message);
                return;
            }


        });

    };


    //POST - Add User in DB
    addUser = function (req, res) {
        console.log('POST');
        console.log(req.body);
        resultado = res;
        request = req;
        var hash = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest('hex');
        req.body.password = hash
        var u = [];
        var u1;
        var u2;
        username = req.body.username;
        User.find(username, function (err, user) {
            console.log (user);
            if (user == "") {
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

    function checkreg(u1, u2, filename) {

        if (u1 == u2) {
            return resultado.status(409).jsonp("usuario " + username + " ya existe");
        }
        else {
            var user = new User({
                username: request.body.username,
                password: request.body.password,
                name: request.body.name,
                email: request.body.email,
                phone: request.body.phone,
                gender: request.body.gender,
                college: request.body.college,
                city: request.body.city,
                rol: "registrado",
                imageUrl: "http://localhost:3000/assets/images/admin.png"

            })

            user.save(function (err, user) {
                if (err) return resultado.send(500, err.message);
                resultado.status(200).jsonp(user);
            });

        }
    };

    //PUT - Update a register already exists
    updateUser = function (req, res) {
        User.findById(req.params.id, function (err, user) {
            console.log('PUT');
            console.log(req.body);
            var hash = crypto
                .createHash("md5")
                .update(req.body.password)
                .digest('hex');

            req.body.password = hash

            if (req.body.rol == "administrador") {
                var rol = "administrador";
            }
            else {
                var rol = "registrado";
            }

            user.username = req.body.username;
            user.password = req.body.password;
            user.name = req.body.name;
            user.email = req.body.email;
            user.phone = req.body.phone;
            user.gender = req.body.gender;
            user.college = req.body.college;
            user.city = req.body.city;
            user.rol = rol;
            user.imageUrl = req.body.imageUrl;

            user.save(function (err) {
                if (err) return res.send(500, err.message);
                res.status(200).jsonp(user);
            });
        });
    };

   //POST - login User
    loginUser = function (req, res) {
        resultado = res;
        var hash = crypto
            .createHash("md5")
            .update(req.body.password)
            .digest('hex');
        var key = [];
        var p1;
        var p2;
        req.body.password = hash
        var u = req.body.username;
        User.find({username: u}, function (err, user) {
            if (user.length == 0) {
                return resultado.status(404).jsonp({"loginSuccessful": false, "username": u});
            }
            else {
                var usuario = JSON.stringify(user);
                console.log(user);
                var res = usuario.split(",");
                key = res[2].split(":");
                p2 = key[1];
                p1 = '"' + req.body.password + '"';
                if (p1 == p2) {
                    console.log ("Entramos..")
                    return resultado.status(200).jsonp({"loginSuccessful": true, "user": user});

                }
                else {
                    return resultado.status(404).jsonp({"loginSuccessful": false, "username": u});
                }
            }
        });

    };

    //DELETE - Delete a User with specified ID
    deleteUser = function (req, res) {
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


    //endpoints
    app.get('/allusers', AllUsers);
    app.get('/users/', findAllUsers);
    app.post('/user/', addUser);
    app.get('/user/:id', findById);
    app.put('/user/:id', updateUser);
    app.delete('/user/:id', deleteUser);
    app.post('/user/login', loginUser);
    app.put('/upload/:username', uploadimage);
    app.get('/user/provider/facebook', findFacebook);
    app.get('/user/provider/twitter', findTwitter);
    app.get('/college/:college', findCollegeUsers);
    app.get('/gender/:gender', findGenderUsers);
    app.get('/gender-ionic/:gender', AllGender);

}
