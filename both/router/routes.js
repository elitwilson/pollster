Router.route('/', {
  name: 'home'
});

Router.route('/createpoll', {
	name: 'createPoll'
});

Router.map(function() {
	this.route('poll', {
		path: '/poll/:_id',
		template: 'poll',
		waitOn: function() {
			return Meteor.subscribe('polls', this.params._id);
		},
		cache: 5, //cache 5 polls
		expire: 3 //expire if inactive for 3 minutes
	});	
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});