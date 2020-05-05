const Driver = require('../models/driver')

module.exports = {
    GoAway(req, res) {
        res.send({ Get: 'Lost'});
    },

    index(req, res, next) {
        const { lng, lat } = req.query;
        Driver.geoNear(
            { type: 'Points', coordinates: [parseFloat(lng), parsefloat(lat)]},
            { spherical: true, maxDistance: 100000 }
        )

        .then((drivers) => res.send(drivers))
        .catch(next);
    },

    create(req, res, next) {
        const driverProps = req.body;
         Driver.create(driverProps)
          .then((driver) => res.send(driver) )
          .catch(next)
    },

    edit(req, res, next) {
       const driverId = req.params.id;
       const driverProps = req.body;

       Driver.findByIdAndUpdate({ _id: driverId}, driverProps)
        .then(() => Driver.findById({ _id: driverId}))
        .then((driver) => res.send(driver) )
        .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;
        

        Driver.findByIdAndRemove({ _id: driverId})
          .then((driver) => res.status(204).send(driver))
          .catch(next);
    }
};