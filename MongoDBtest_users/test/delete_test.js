const assert = require('assert');
const User = require('../src/user');

describe('Deleting a user', () => {
    let mary;

    beforeEach((done) => {
        mary = new User({ name: 'Mary' });
        mary.save()
         .then(() => done());
    });
    it('model instance remove', (done) => {
        //Remove a very specific record only
          mary.remove()
          .then(() => User.findOne({ name: 'Mary' }))
          .then((user) => {
              assert(user === null);
              done();
          });
    });
    it('class method remove', (done) => {
        // Remove a bunch of records with some given criteria
        User.remove({ name: 'Mary' })
         .then (() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             assert(user === null);
             done();
         });
    });
    it ('class method findAndRemove', (done) => {
         User.findOneAndRemove({ name: 'Mary' })
          .then(() => User.findOne({ name: 'Mary' }))
          .then((user) => {
              assert(user === null);
              done();
          });
    });
    it('class method findByIdAndRemove', (done) => {
        User.findByIdAndRemove(mary._id)
         .then(() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             assert(user === null);
             done();
         });
    });
});