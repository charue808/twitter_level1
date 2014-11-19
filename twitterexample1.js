Posts = new Mongo.Collection('posts');

if (Meteor.isClient) {
  Meteor.subscribe('posts');

  Template.postsList.helpers({
  posts: function() {
    return Posts.find();
  }
});
}


      
if (Meteor.isServer) {
  if (Posts.find().count() === 0) {
  Posts.insert({
    author: 'jumal@harvestlearninggroup.com',
    body: 'Going to get boba!'
  });

  Posts.insert({
    author: 'charlesgum@gmail.com',
    body: 'watching the game at McSorley\'s'
  });

  Posts.insert({ 
    author: 'dirkgaines@test.com',
    body: 'new testing data'
  });
       Meteor.publish('posts', function() {
  return Posts.find();
});
       
        
}