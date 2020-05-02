const assert = require('assert');
const User = require('../src/user');


describe('Reading users out of the data base', () => {


    beforeEach((done) => {
        mary = new User({ name: 'Mary' });
        mary.save()
          .then(() => done() );
    })
    
     it('Finds all users with a name of mary', (done) => {
          User.find({ name: 'Mary' })
           .then((users) => {
             assert(users[0]._id.toString() === mary._id.toString());
               done();
           });
     });
    it('Find a user with a particular id', (done) => {
      User.findOne({ _id: mary._id })
        .then((user) => {
          assert(user.name === 'Mary');
          done();
        });
    });
});

