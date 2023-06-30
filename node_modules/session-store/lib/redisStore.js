var _ = require('lodash');
var q = require('q');

var Store = require('./store');
var redis = require('./modules/redis');

function RedisStore(options){
	this.redis = new redis(options);
};

RedisStore.prototype = Object.create(Store.prototype);

RedisStore.prototype._get = function(id){
	var self = this;

	return self.redis.ready
	.then(function(){
		return self.redis.get(id)
		.then(function(data){
			var json = {};

			try {
				json = JSON.parse(data);
			} catch(e){}

			return json || {};
		});
	});
};

RedisStore.prototype.get = function(id){
	var self = this;
	return self._get(id);
};

RedisStore.prototype.save = function(id, data){
	var self = this;

	return self.redis.ready
	.then(function(){
		return self.redis.set(id, JSON.stringify(data));
	});
};

RedisStore.prototype.destroy = function(id){
	var self = this;

	return self.redis.ready
	.then(function(){
		return self.redis.del(id);
	});
};

module.exports = RedisStore;