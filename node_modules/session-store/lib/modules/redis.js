var _ = require('lodash');
var q = require('q');
var redis = require('redis');
var main = require.main.exports;
var config = main.config;

var cacheWrap = function(options){
	var deferred = q.defer();

	options = _.defaults(options || {}, {
		host: '127.0.0.1',
		port: 6379
	});

	var cache = redis.createClient(options.port, options.host);

	cache.on('error', function(err){ 
		console.log('error connecting', err);
	});

	cache.on('connect', function(){ });

	cache.on('ready', function(){
		deferred.resolve();
	});

	var commandList = ['setex', 'get', 'set', 'keys', 'del'];

	var commands = {};

	_.each(commandList, function(cmd){
		commands[cmd] = function(){
			var args = Array.prototype.slice.call((arguments || []));

			return deferred.promise.then(function(){
				var defer = q.defer();
				var cb = function(err, res){
					if(err){
						return defer.reject(err);
					}

					return defer.resolve(res);
				};

				args.push(cb);
				cache[cmd].apply(cache, args);

				return defer.promise;
			});
		};
	});

	return _.extend({
		ready: deferred.promise
	}, commands);
};

module.exports = cacheWrap;