const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    it('saves user', (done) => {
       const mary = new User({ name: 'Mary' });

       mary.save()
        .then(() => {
           assert(!mary.isNew);
           done();
        });
    });
});