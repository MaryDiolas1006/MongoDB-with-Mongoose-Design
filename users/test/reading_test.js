const assert = require('assert');
const User = require('../src/user');


describe('Reading users out of the data base', () => {
     let mary, ting, sheng, zest, mew;

    beforeEach((done) => {
        mary = new User({ name: 'Mary' });
        ting = new User({ name: 'Ting'});
        sheng = new User({ name: 'Sheng'});
        zest = new User({ name: 'Zest'});
        mew = new User({ name: 'Mew'});

        Promise.all([ mary.save(), ting.save(), sheng.save(), zest.save(), mew.save()])
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

    it('can skip and limit the result set', (done) => {
      User.find({}).sort({ name: 1 }).skip(1).limit(2)
       .then((users) => {
         assert(users.length === 2);
         assert(users[0].name === 'Ting');
         assert(users[1].name === 'Sheng');
         done();
       });
    });
});

