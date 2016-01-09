module.exports = function (app) {

    var Comment = require('../models/comment.js');
    var User = require('../models/user.js');

    //POST - Add Release
    addComment = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var comment = new Comment({
            user: req.body.iduser,
            release: req.body.idr,
            comment: req.body.text

        })
        comment.save(function (err, comment) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(comment);
        });


    };

    //GET- GET ALL Releases by Username
    findComments = function (req, res) {
        Comment.find({release: req.params.idr}, function (err, comments) {
            User.populate(comments, {path: "user"}, function (err, comments) {
                res.status(200).send(comments);
            });
        });
    };

    //endpoints
    app.get('/comments/:idr', findComments);
    app.post('/addcomment', addComment);

}

