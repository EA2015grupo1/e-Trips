module.exports = function (app) {
    var Forum = require('../models/forum.js');


//GET - Return all forum
    exports.AllForum = function (req, res) {
        console.log('all forum');
        Forum.find({})
            /* .populate('foro.universidad', {path:"User", select:"username"})
             .populate('foro.topics.usercreator', {path:"College", select:"college"})*/
            .exec(function (err, forum) {
                if (err) res.send(500, err.message);
                console.log('GET /forum' + JSON.stringify(forum));
                res.status(200).jsonp(forum);
            })
        /*
         Forum.find({})
         .populate('foro.universidad', {path:"User", select:"username"})
         .populate('foro.topics.usercreator', {path:"College", select:"college"})
         .exec(function(err, forum) {
         if (err) {return res.status(500).send(err.message);}
         console.log('GET /forum' + JSON.stringify(forum));
         res.status(200).jsonp(forum);
         });
         */
    };

    exports.addUniversidad = function (req, res) {
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

    exports.getTema = function (req, res) {
        Forum.findById(req.params.id, function (err, forum) {
            if (err) return res.send(500, err.message);

            console.log('GET /user/' + req.params.id);
            res.status(200).jsonp(forum);
        });

    }
    exports.deleteTema = function (req, res) {


    }

    //endpoints
    app.get('/forum', AllForum);
    app.post('/forum/:universidad', addUniversidad);
    app.delete('/forum/:universidad/:tema', deleteTema);
}