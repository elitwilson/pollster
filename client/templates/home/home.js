Template.home.rendered = function() {
	Session.set("questionInputToggle", "display:true");
	// set defaults
	var poll = {
		questionText: "test",
		options: {
			editable: true
		}
	};
	var response = {
		responseText: null,
		responseType: null,
	}
	Session.set("poll", poll);
};

Template.createPoll.events({
	"submit #pollForm": function(event) {
		var poll = Session.get("poll");
		poll.questionText = event.target.pollQuestion.value;

		//ToDo: Check to see if last character is a "?" and if not, add it
		Session.set("poll", poll);

		return false;
	},
	"submit #pollOptions": function(event) {
		if(event.target.pollTypeRadios.value != "") {
			var poll = Session.get("poll");
			poll.options = {
				pollType: event.target.pollTypeRadios.value,
				comments: event.target.commentOpt.checked,
				editable: false
			}
			Session.set("poll", poll);

			return false;	
		}
		return false;
	},
	"submit #newResponseItem": function() {
		var poll = Session.get("poll");
		if (!poll.responses || poll.responses.length == 0){
			poll.responses = [];
		}
		var response = {
			responseText: event.target.newResponseItem.value
		}
		poll.responses.push(response);
		console.log(poll);
		Session.set("poll", poll);

		event.target.newResponseItem.value = "";
		return false;
	},
	"click #editQuestion": function() {
		var poll = Session.get("poll");
		poll.questionText = null;
		Session.set("poll", poll);
	},
	"click #editOptions": function() {
		var poll = Session.get("poll");
		poll.options.editable = true;
		Session.set("poll", poll);
	}
});

Template.createPoll.helpers({
	poll: function() {
		return Session.get("poll");
	},
	responses: function() {

	},
	questionInputToggle: function() {
		return Session.get("questionInputToggle");
	}
});
