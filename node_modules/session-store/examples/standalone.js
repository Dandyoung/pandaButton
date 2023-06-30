
var SessionStore = require('../');

var sessionManager = new SessionStore.Manager(new SessionStore.RedisStore());

var id = 'efb8d800-3946-11e4-8133-c792b2833abc';

sessionManager.createSession(id)
.then(function(userSession){
	console.log('user session', userSession);

	userSession.set({ baz: 'foo' })
	.then(function(){
		console.log('after set', userSession);

		userSession.flush()
		.then(function(){
			console.log('after flush', userSession);
		})
	});
});