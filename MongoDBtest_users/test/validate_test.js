const assert = require('assert');
const User = require('../src/user');

describe('Validating records', () => {
    it('Requires a user name', () => {
        const user = new User({ name: undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
       
        assert( message === 'Name is required');
    });

    it('Requires name longer than 2 characters', () => {
        const user = new User({ name: 'MS' })
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;

        assert(message === 'Name must be longer than 2 characters');
    });

    it('Disallow invalid records from being save', (done) => {
        const user = new User({ name: 'MS'})
         user.save()
           .catch((validationResult) => {
               const { message } = validationResult.errors.name;

               assert(message === 'Name must be longer than 2 characters');
               done();
           });
    });
}); 