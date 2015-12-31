module.exports = function (app) {
    var College = require('../models/college.js');

  //GET - Return all Colleges in the DB
   AllColleges = function (req, res) {
        College.find(function (err, colleges) {
            if (err) res.send(500, err.message);

            console.log('GET /colleges')
            res.status(200).jsonp(colleges);
        });
    };

    //GET - Return Colleges by City
    findByCity = function (req, res) {
        var c = req.params.city;
        College.find({city: c}, function (err, colleges) {
            if (err) res.send(500, err.message);

            console.log('GET /colleges')
            res.status(200).jsonp(colleges);

        });
    };
    //POST - Add College in DB
    addCollege = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var college = new College({
            city: req.body.city,
            college: req.body.college,
            url: req.body.url

        })

        college.save(function (err, college) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(college);
        });


    };
    //DELETE - Delete College in DB
    deleteCollege = function (req, res) {
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
    };

    //endpoints
    app.get('/colleges', AllColleges);
    app.post('/colleges', addCollege);
    app.get('/colleges/:city', findByCity);
    app.delete('/college/:id', deleteCollege);

}
