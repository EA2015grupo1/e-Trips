
var mongoose = require('mongoose');
var College  = mongoose.model('College');

//GET - Return all Users in the DB
exports.AllColleges = function(req, res) {
    College.find(function(err, colleges) {
        if(err) res.send(500, err.message);

        console.log('GET /colleges')
        res.status(200).jsonp(colleges);
    });
};
exports.findByCity = function(req, res) {
    var c= req.params.city;
    College.find({city:c}, function(err,colleges) {
        if(err) res.send(500, err.message);

        console.log('GET /colleges')
        res.status(200).jsonp(colleges);

    });
};
exports.addCollege = function(req, res) {
    console.log('POST');
    console.log(req.body);
    var college = new College({
        city:    req.body.city,
        college: 	  req.body.college,
        url:   req.body.url

    })

    college.save(function(err, college) {
        if(err) return res.send(500, err.message);
        res.status(200).jsonp(college);
    });


};
exports.deleteCollege = function(req, res) {
    return College.findById(req.params.id, function (err, college) {
        console.log('DELETE College');
        return college.remove(function (err) {
            if (!err) {
                console.log("univesidad eliminada");
                return res.send('');
            } else {
                console.log(err);
            }
        });
    });
}


