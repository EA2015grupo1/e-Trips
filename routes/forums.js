module.exports = function (app) {
    var Forum = require('../models/forum.js');
    var User = require('../models/user.js');
    var College = require('../models/college.js');

    //GET - Return all forum
    AllForum = function(req, res) {
        console.log('all forum');
        Forum.find(function(err, forum) {
            User.populate(forum, {path:"User", select:"username"},function(err, forum){});
            College.populate(forum, {path:"College", select:"college"},function(err, forum) {});
            if (err) res.send(500, err.message);
            res.status(200).send(forum);
        });
    };
        /*
         Forum.find({})
         .populate('foro.universidad', {path:"User", select:"username"})
         .populate('foro.topics.usercreator', {path:"College", select:"college"})
         .exec(function(err, forum) {
         if (err) {return res.status(500).send(err.message);}
         console.log('GET /forum' + JSON.stringify(forum));
         res.status(200).jsonp(forum);
         });*/




    addUniversidad = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var college = new College({
            college: req.body.college,

        })

        college.save(function (err, college) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(college);
        });
    };

    getTema = function (req, res) {
        Forum.findById(req.params.id, function (err, forum) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(forum);
        });
    };

    //endpoints
    app.get('/forum', AllForum);
}