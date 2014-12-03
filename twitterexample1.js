Posts = new Mongo.Collection('posts');

Meteor.methods({
  post: function(postAttributes) {
    var user = Meteor.user()

    var post = _.extend(_.pick(postAttributes, 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    var postId = Posts.insert(post);

    return postId;
  }
});

if (Meteor.isClient) {
  Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});

Meteor.subscribe('posts', function onReady() {
  Session.set('postsLoaded', true);
});  
//  passed the function onReady to the subscription
//  Session set the postsLoaded helper to true

Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort:{submitted: -1}});
  },
  postsLoaded: function() {
    return Session.get('postsLoaded');
  } 
  // postsLoaded add to postList helpers
  // postloaded function returns Session postsLoaded
});
Template.submitPost.helpers({
  textTotal: function() {
    var textLength = 140;
    return textLength;
  },
  textCount: function() {

  },

});

Template.submitPost.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = { body: $(e.target).find('[name=message]').val() }

   Meteor.call('post', post)

    document.getElementById('textBody').value = ' ';

  }
});

Template.postItem.helpers({
  submittedText: function() {
    return  new Date(this.submitted).toString();
  }
});

}


      
if (Meteor.isServer) {
  

Meteor.publish('posts', function() {
  return Posts.find();
});

}
       
        
