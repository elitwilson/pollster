Router.route('/', {
  name: 'home'
});

Router.route('/createpoll', {
	name: 'createPoll'
});

Router.route('/poll', {
	name: 'poll'
});

Router.plugin('ensureSignedIn', {
  only: ['dashboard']
});