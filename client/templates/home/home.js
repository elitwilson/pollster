Template.home.rendered = function() {

	// set defaults
	var poll = {
		questionText: null,
		responses: [],
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
		if(poll.questionText == "") {
			FlashMessages.clear();
			FlashMessages.sendError("Must enter a poll question");

			return false;
		}

		FlashMessages.clear();
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
			FlashMessages.clear();
			return false;	
		}
		FlashMessages.clear();
		FlashMessages.sendError("Must select a poll type");

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
		if (event.target.newResponseItem.value != "") {
			poll.responses.push(response);
			Session.set("poll", poll);

			event.target.newResponseItem.value = "";

			FlashMessages.clear();
			return false;
		} else {
			FlashMessages.clear();
			FlashMessages.sendError("Must enter response option text");

			return false;
		}		
	},
	"click #removeResponseItem": function() {
		var poll = Session.get("poll");
		poll.responses = _.without(poll.responses, _.findWhere(poll.responses, { responseText: this.responseText}));
		Session.set("poll", poll);
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
	},
	"click #pollComplete": function() {
		var poll = Session.get("poll");
		var finishedPoll = {
			questionText: poll.questionText,
			pollType: poll.options.pollType,
			responses: poll.responses,
			comments: poll.options.comments
		}
		Meteor.call("createPoll", finishedPoll);

		return false;
	},
	"submit": function() {
		var poll = Session.get("poll");
		if (poll.questionText && poll.options && poll.responses.length > 0 && poll.options.editable == false) {
			poll.readyForSubmit = true;
		} else {
			poll.readyForSubmit = false;
		}
		Session.set("poll", poll);
	},
	"click a": function() {
		var poll = Session.get("poll");
		if (poll.questionText && poll.options && poll.responses.length > 0 && poll.options.editable == false) {
			poll.readyForSubmit = true;
		} else {
			poll.readyForSubmit = false;
		}
		Session.set("poll", poll);
	}
});

Template.createPoll.helpers({
	poll: function() {
		return Session.get("poll");
	}
});
