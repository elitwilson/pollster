Template.createPoll.rendered = function() {

	// set defaults
	var poll = {
		questionText: null,
		responseOptions: [],
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

Template.pollForm.events({
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
		if (!poll.responseOptions || poll.responseOptions.length == 0){
			poll.responseOptions = [];
		}
		var response = {
			responseText: event.target.newResponseItem.value
		}
		if (event.target.newResponseItem.value != "") {
			poll.responseOptions.push(response);
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
		poll.responseOptions = _.without(poll.responseOptions, _.findWhere(poll.responseOptions, { responseText: this.responseText}));
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
			responseOptions: poll.responseOptions,
			responses: [],
			comments: poll.options.comments
		}
		Meteor.call("createPoll", finishedPoll);
		Router.go('/');

		return false;
	},
	"submit": function() {
		var poll = Session.get("poll");
		if (poll.questionText && poll.options && poll.responseOptions.length > 0 && poll.options.editable == false) {
			poll.readyForSubmit = true;
		} else {
			poll.readyForSubmit = false;
		}
		Session.set("poll", poll);
	},
	"click a": function() {
		var poll = Session.get("poll");
		if (poll.questionText && poll.options && poll.responseOptions.length > 0 && poll.options.editable == false) {
			poll.readyForSubmit = true;
		} else {
			poll.readyForSubmit = false;
		}
		Session.set("poll", poll);
	}
});

Template.pollForm.helpers({
	poll: function() {
		return Session.get("poll");
	}
});
