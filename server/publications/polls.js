Meteor.publish("polls", function(id) {
  return Polls.find({_id: id});
});



/*Meteor.publish('posts', function(author) {
  return Posts.find({flagged: false, author: author});
});*/