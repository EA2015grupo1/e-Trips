module.exports = function (app) {

    var Release = require('../models/release.js');
    var User = require('../models/user.js');

    //POST - Add Release
    addRelease = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var release = new Release({
            receiver: req.body.user,
            sender: req.body.ids,
            text: req.body.text

        })
        release.save(function (err, release) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(release);
        });


    };

    //GET- GET ALL Releases by Username
    findReleases = function (req, res) {
        Release.find({receiver: req.params.username}, function (err, releases) {
            User.populate(releases, {path: "sender"}, function (err, releases) {
                res.status(200).send(releases);
            });
        });
    };

    //endpoints
    app.get('/releases/:username', findReleases);
    app.post('/addrelease', addRelease);

}
