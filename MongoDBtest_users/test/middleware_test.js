const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');


describe('Middleware', () => {
    let mary, blogPost;

    beforeEach((done) => {
        mary = new User({ name: 'Mary' })
        blogPost = new BlogPost({ title: ' I go', content: 'Yeah I should go' })
 
        mary.blogPosts.push(blogPost);
       
        Promise.all([ mary.save(), blogPost.save() ])
          .then(() => done());
    });
     
    it('users clean up dangling blogposts on remove', (done) => {
        mary.remove()
         .then(() => BlogPost.count())
         .then((count) => {
             assert(count === 0);
             done();
         });
    });
});