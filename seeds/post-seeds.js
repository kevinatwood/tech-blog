const { Post } = require('../models');

const postData = [
     {
        title: 'Post #1',
        body: 'This is the body of post #1',
        user_id: 1,
        comment_id: [1, 2]
    }, 
    {
        title: 'Post #2',
        body: 'This is the body of post #2',
        user_id: 2,
        comment_id: null
    }, 
    {
        title: 'Post #3',
        body: 'This is the body of post #3',
        user_id: 2,
        comment_id: null
    }, 
    {
        title: 'Post #4',
        body: 'This is the body of post #4',
        user_id: 2,
        comment_id: 3
    }, 
  
]

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;