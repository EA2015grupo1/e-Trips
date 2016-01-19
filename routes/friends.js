module.exports = function (app) {

    var Friend = require('../models/friend.js');
    var User = require('../models/user.js');

    //POST - Add Friends
    addFriend = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var friend = new Friend({
            username: req.body.user,
            friend: req.body._id

        })
        friend.save(function (err, friend) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(friend);
        });


    };
    //GET - Return a Friends with specified iduser
    findByIdFriend = function (req, res) {
        console.log(req.body);
        Friend.find({friend:req.params.id}, function (err, friends) {
            if (err) return res.send(500, err.message);

            console.log('GET /friend/' + req.params.id);
            res.status(200).jsonp(friends);
        });
    };
    //GET- GET ALL Friends by Username
    findFriends = function (req, res) {
        console.log (req.params.username);
        Friend.find({username: req.params.username}, function (err, friends) {
            User.populate(friends, {path: "friend"}, function (err, friends) {
                res.status(200).send(friends);
            });
        });
    };

    //endpoints
    app.get('/friends/:username', findFriends);
    app.get('/friends-user/:id', findByIdFriend);
    app.post('/addfriend', addFriend);

}
