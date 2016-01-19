module.exports = function (app) {

    var User = require('../models/user.js');
    var Request = require('../models/request.js');


    //GET - GET All Requests
    findRequests = function (req, res) {
        console.log (req.params.username);
        Request.find({username: req.params.username}, function (err, requests) {
            User.populate(requests, {path: "request"}, function (err, requests) {
                res.status(200).send(requests);
            });
        });
    };

    //POST - POST Request By id User
    addRequest = function (req, res) {
        console.log('POST');
        console.log(req.body);
        User.findOne({username: req.body.username}, function (err) {
            if (err) {
                res.send(401, err.message);
            }
            else {
                var request = new Request({
                    username: req.body.username,
                    request: req.body._id

                });

                request.save(function (err, request) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(request);
                });

            }

        });

    };
    //GET - Return a Requests with specified iduser
    findByIdRequest = function (req, res) {
        console.log(req.body);
        Request.find({request:req.params.id}, function (err, request) {
            if (err) return res.send(500, err.message);

            console.log('GET /request/' + req.params.id);
            res.status(200).jsonp(request);
        });
    };

    //DELETE - Delete a Request with specified ID
    deleteRequest = function (req, res) {
        console.log(req.body);
         return Request.findById(req.params.id, function (err, request) {
            return request.remove(function (err) {
                if (!err) {
                    console.log("Solicitud eliminada");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
    };

    //endpoints
    app.post('/addrequest', addRequest);
    app.get('/requests/:username', findRequests);
    app.get('/requests-send/:id', findByIdRequest);
    app.delete('/request/:id', deleteRequest);

};