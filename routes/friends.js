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
    app.post('/addfriend', addFriend);

}
