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

  Meteor.subscribe('posts');

Template.postsList.helpers({
  posts: function() {
    return Posts.find({}, {sort:{submitted: -1}});
  }
});

Template.submitPost.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var post = { body: $(e.target).find('[name=message]').val() }

   Meteor.call('post', post, function(error, id) {
    if(error)
      return alert(error.reason);
   })

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
       
        
