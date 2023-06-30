var _ = require('lodash');
var q = require('q');
var md5 = require('MD5');
var uuid = require('uuid');
var Manager = require('./manager');
var Store = require('./store');

var generateInternalSessionId = function(key, sessionId){
	return md5([key, sessionId].join(''));
};

var middleware = function(options){
	options = options || {};
	options = _.defaults(options, {
		alwaysFlush: true,
		waitForFlush: true,
		cookieKey: 'session-store',
		salt: 'session-salt',
		cookie: _.defaults(options.cookie || {}, {
			path: '/',
			expires: new Date(Date.now() + 60 * 60 * 24 * 1000),
			httpOnly: true,
			secure: false
		}),
		sessionManager: new Manager(new Store())
	});

	return function(req, res, next){
		var oldEnd = res.end;
		var cookie = req.cookies[options.cookieKey];
		if(!cookie){
			cookie = uuid.v1();
			res.cookie(options.cookieKey, cookie, options.cookie);
		}
		var sessionId = cookie;
		var internalSessionId = generateInternalSessionId(options.salt, sessionId);

		options.sessionManager.createSession(internalSessionId)
		.then(function(session){

			req.session = session;

			res.end = function(){
				var args = _.values(arguments);

				if(req.session._dirty || options.alwaysFlush){
					if(options.waitForFlush){
						return req.session.flush()
						.then(function(){
							oldEnd.apply(res, args);
						});
					} else {
						req.session.flush();
					}
				}
				oldEnd.apply(res, args);
			};

			next();
		});
	};
};

module.exports = middleware;