const Post = require('./Post');
const User = require('./User');
const Comment = require('./Comment');

Post.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Post, {
    foreignKey: 'user_id'
})

Comment.belongsTo(User, {
    foreignKey: 'user_id'
})

User.hasMany(Comment, {
    foreignKey: 'user_id'
})

Comment.belongsTo(Post, {
    foreignKey: "comment_id"
})

Post.hasMany(Comment, {
    foreignKey: "comment_id"
})

module.exports = {
    Post, 
    User,
    Comment,
}