const assert = require('assert');
const User = require('../src/user');


describe('Subdocuments', () => {
    it('Can create subdocument', (done) => {
       const mary = new User({ name: 'Mary', posts: [{ title: 'I go'}]})
       mary.save()
        .then(() => User.findOne({ name: 'Mary' }))
        .then((user) => {
            assert(user.posts[0].title === 'I go');
            done();
        });
    });

    it('Can add subdocuments to an existing records', (done) => {
        const mary = new User({ name: 'Mary', posts: [] });
         
        mary.save()
         .then(() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             User.posts.push({ title: 'Never go'});
             return user.save();
         })
         .then(() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             assert(user.posts[0].title === 'Never go');
             done();
         });
    });

    it('Can remove an existing subdocument', (done) => {
        const mary = new User({ name: 'Mary', posts: [{ title: 'New life'}]})

        mary.save()
         .then(() => User.findOne({ name: 'Mary'}))
         .then((user) => {
             const post = user.posts[0];
             post.remove();
             return user.save();
         })
         .then(() => User.findOne({ name: 'Mary' }))
         .then((user) => {
             assert(user.posts.length === 0);
             done();
         });
    });
});