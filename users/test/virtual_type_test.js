const assert = require('assert');
const User = require('../src/user');


describe('Virtual types', () => {
    it('postCount returns number of posts', (done) => {
        const mary = new User({ name: 'Mary', posts: [{title: 'I go'}]})

        mary.save()
         .then(() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             assert(mary.postCount === 1);
             done();
         });
     });
});