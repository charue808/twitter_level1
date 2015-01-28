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
    
    
Meteor.Spinner.options = {
    lines: 13, // The number of lines to draw
    length: 10, // The length of each line
    width: 5, // The line thickness
    radius: 15, // The radius of the inner circle
    corners: 0.7, // Corner roundness (0..1)
    rotate: 0, // The rotation offset
    direction: 1, // 1: clockwise, -1: counterclockwise
    color: '#fff', // #rgb or #rrggbb
    speed: 1, // Rounds per second
    trail: 60, // Afterglow percentage
    shadow: true, // Whether to render a shadow
    hwaccel: false, // Whether to use hardware acceleration
    className: 'spinner', // The CSS class to assign to the spinner
    zIndex: 2e9, // The z-index (defaults to 2000000000)
    top: 'auto', // Top position relative to parent in px
    left: 'auto' // Left position relative to parent in px
};

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
    
Template.userFeature.events({
  'click #button1': function () {
     document.getElementById('theImage').src="/image/Twitterbox1.png";
     document.getElementById('theTextBox').src="/image/wigflip-ds (2).png";
    },
  'click #button2': function () {
     document.getElementById('theImage').src="/image/twitterinvite2.png";
     document.getElementById('theTextBox').src="/image/wigflip-ds (4).png";
     
    },
  'click #button3': function () {
     document.getElementById('theImage').src="/image/twitter3.png";
     document.getElementById('theTextBox').src="/image/wigflip-ds (3).png";
    },
})

}


      
if (Meteor.isServer) {
  

Meteor.publish('posts', function() {
  return Posts.find();
});

}
       
        
