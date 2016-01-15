module.exports = function (app) {

    var User = require('../models/user.js');
    var Message = require('../models/message.js');
    var Chat = require('../models/chat.js');


    //GET - GET All Messages by Username
    findMessages = function (req, res) {
        console.log (req.params.username);
        Message.find({receiver: req.params.username}, function (err, messages) {
            User.populate(messages, {path: "sender"}, function (err, messages) {
                res.status(200).send(messages);
            });
        });
    };

    //GET - GET All Messages by Username
    findMessagesChat = function (req, res) {
        Chat.find(function (err, messages) {
            if (err) res.send(500, err.message);

            console.log('GET /chat-messages')
            res.status(200).jsonp(messages);
        });
    };

    //POST - POST Message Chat By id User
    addChat = function (req, res) {
        console.log('POST');
        console.log(req.body);
                var chat = new Chat({
                    imageUrl: req.body.imageUrl,
                    id: req.body.id,
                    user: req.body.user,
                    msg: req.body.message,
                    date: req.body.date

                })

                chat.save(function (err, chat) {
                    if (err) return res.send(500, err.chat);
                    res.status(200).jsonp(chat);
                });
    };

    //POST - POST Message By User
    addMessage = function (req, res) {
        console.log('POST');
        console.log(req.body);
        User.findOne({username: req.body.username}, function (err) {
            if (err) {
                res.send(401, err.message);
            }
            else {
                var message = new Message({
                    receiver: req.body.receiver,
                    sender: req.body.ids,
                    subject: req.body.subject,
                    text: req.body.text,
                    read: false

                })

                message.save(function (err, message) {
                    if (err) return res.send(500, err.message);
                    res.status(200).jsonp(message);
                });

            }

        });

    };


    //DELETE - Delete a Request with specified ID


    //endpoints
    app.post('/addmessage', addMessage);
    app.post('/addchat', addChat);
    app.get('/messages/:username', findMessages);
    app.get('/chat', findMessagesChat);

}
