Template.poll.rendered = function() {
};

Template.enterPoll.helpers({
	poll: function() {
		return Polls.find({}).fetch()[0];
	}
});

Template.enterPoll.events({
	"submit form": function(event, template){
		var poll = Polls.find({}).fetch()[0];
		var selected = template.findAll("input[type=" + poll.pollType + "]:checked");

		var array = _.map(selected, function(item) {
			return item.defaultValue;
		});
		console.log(array);
		return false;
	}
})