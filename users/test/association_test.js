const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');


describe ('Associations', () => {
   let mary, blogPost, comment;

   beforeEach((done) => {
       mary = new User({ name: 'Mary' })
       blogPost = new BlogPost({ title: ' I go', content: 'Yeah I should go' })
       comment = new Comment({ content: 'You can do it' })

       mary.blogPosts.push(blogPost);
       blogPost.comments.push(comment);
       comment.user = mary;
       
       Promise.all([ mary.save(), blogPost.save(), comment.save()])
         .then(() => done());
   });

   it('Saves a relation between a user and a blogPost', (done) => {
       User.findOne({ name: 'Mary' })
        .populate('blogPosts')
        .then((user) => {
           assert(user.blogPosts[0].title === 'I go');
            done();
        });
   });

   it('saves a full relation graph', (done) => {
       User.findOne({ name: 'Mary' })
       .populate({
           path: 'blogPosts',
           populate: {
               path: 'comments',
               model: 'comment',
               populate:{
                   path: 'user',
                   model: 'user'
               }
           }
       })
         .then((user) => {
             assert(user.name === 'Mary');
             assert(user.blogPosts[0].title === 'I go');
             assert(user.blogPosts[0].comments[0].content === 'Yeah I should go');
             assert(user.blogPosts[0].comments[0].user.name === 'Mary');

             done();
         });
   });
});