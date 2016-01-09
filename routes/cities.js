module.exports = function (app) {
    var City = require('../models/city.js');


   //GET - Return all Users in the DB
    AllCities = function (req, res) {
        var ciudades = {};
        City.find(function (err, cities) {
            console.log('GET /cities')
            res.status(200).jsonp(cities);
        });
    };

   //POST - Add City in the DB
   addCity = function (req, res) {
        console.log('POST');
        console.log(req.body);
        var city = new City({
            city: req.body.city,

        })

        city.save(function (err, city) {
            if (err) return res.send(500, err.message);
            res.status(200).jsonp(city);
        });


    };

    //DELETE - Delete a City with specified ID
    deleteCity = function (req, res) {
        return City.findById(req.params.id, function (err, city) {
            console.log('DELETE City');
            return city.remove(function (err) {
                if (!err) {
                    console.log("ciudad eliminada");
                    return res.send('');
                } else {
                    console.log(err);
                }
            });
        });
    };

    //endpoints
    app.get('/cities', AllCities);
    app.post('/cities', addCity);
    app.delete('/city/:id', deleteCity);

}


