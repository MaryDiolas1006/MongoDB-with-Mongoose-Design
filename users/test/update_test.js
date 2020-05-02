const assert = require('assert');
const User = require('../src/user');


describe('Updating records', () => {
    let mary

    beforeEach((done) => {
        mary = new User({ name: 'Mary', likes: 0 });
        mary.save()
         .then(() => done());
    });

    function assertName(operation, done){
        operation
        .then(() => User.find({}))
          .then((users) => {
              assert(users.length === 1);
              assert(users[0].name === 'MarySheng');
              done();
          });
    }

    it('instance type usig set n save', (done) =>{
         mary.set('name', 'MarySheng')
         assertName(mary.save(), done);
          
    });
    it('A model instance can update', (done) => {
        assertName(mary.update({ name: 'MarySheng' }), done);
    });
    it('a model class can update', (done) => {
        assertName(User.update({ name: 'Mary' }, { name: 'MarySheng' }), done);
    });
    it('A model class can update a record', (done) => {
        assertName(User.findOneAndUpdate({ name: 'Mary'}, { name: 'MarySheng'}), done);
    });
    it('A model class can update findByIdAndUpdate', (done) => {
        assertName(User.findByIdAndUpdate(mary._id, {name: 'MarySheng'}), done)
    });
    
    xit('A user postCount incremented by 1', (done) => {
        User.update({ name: 'Mary' }, {$inc: {likes: 10 }})
           .then(() => User.findOne({ name: 'Mary' }))
           .then((user) => {
               assert(user.likes === 10 );
               done();
           });
    });
});