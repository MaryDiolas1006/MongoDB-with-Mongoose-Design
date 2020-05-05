const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Driver = mongoose.model('driver');


describe('Drivers controller', () => {
    it('Post to /api/drivers create a new driver', (done) => {
         Driver.count()
          .then(() => {
            request(app)
            .send({ email: 'test@test.com'})
            .end(() => {

                Driver.count()
                 .then((newCount) => {
                     assert(count + 1 === newCount);
                     done();
                 });
            });
          });
    });

    it('PUT /api/drivers/id edits and existing driver', (done) => {
          const driver = new Driver({ email: 't@t.com', driving: false})
            driver.save()
             .then(() => {
                 request(app)
                 .put(`/api/drivers${driver._id}`)
                 .send({ driving: true })
                .end(() => {
                    Driver.findOne({email: 't@t.com'})
                     .then((driver) => {
                         assert(driver.driving === true )
                         done();
                     });
                });
             });
    });

    it('Delete to /api/drivers/id can delete a driver', (done) => {
        const driver = new Driver ({ email: 'test@test.com'});

        driver.save()
            .then(() => {
                request(app)
                .delete(`/api/drivers/${driver._id}`)
                 .end(() => {
                     Driver.findOne({ email: 'test@test.com'})
                     .then((driver) => {
                         assert(driver === null)
                         done();
                     });
                 });
            });
    });

    it('Get to /api/drivers finds driver in a location', (done) => {
        const makatiDriver = new Driver({
            email: 'makati@test.com',
            geometry: { type: 'Point', coordinates: [ -123.365767, 27.8249028439]}
        });

        const qcDriver = new Driver ({
            email: 'qc@test.com',
            geometry: { type: 'point', coordinates: [24.343, 244.43424]}
        });
        Promise.all([ makatiDriver.save(), qcDriver.save()])
         .then(() => {
             request(app)
             .get('/api/drivers?lng=-123&lat=27')
             .end((response) => {
                 assert(response.body.length === 1)
                 assert(response.body[0].obj.email === 'makati@test.com')
                 done();
             });
         });
    });
});