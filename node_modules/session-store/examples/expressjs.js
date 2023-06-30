var express = require('express');
var SS = require('../');
var cookieParser = require('cookie-parser');

var server = express();


var SessionManager = new SS.Manager(new SS.RedisStore());

server.use(cookieParser());

server.use(new SS.Middleware({
	sessionManager: SessionManager,
	cookieKey: 'my-cookie-key',
	salt: 'my-salt'
}));

server.get('/', function(req, res, next){
	req.session.set({ something: 'first value' });
	next();
}, function(req, res, next){
	req.session.set({ something: 'second value' });
	next();
}, function(req, res, next){

	console.log(req.session);
	res.json(req.session);
});

server.get('/delete', function(req, res){
	req.session.destroy();
	res.json({});
});

server.get('/session', function(req, res){
	res.json(req.session);
});

server.listen(8000);