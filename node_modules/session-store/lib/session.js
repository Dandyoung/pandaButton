var _ = require('lodash');
var q = require('q');

function Session(store, id){
	var self = this;

	self.store = store;
	self.id = id;

	self._dirty = false;
	self.attributes = {};

	return self.store.get(id)
	.then(function(data){
		data = data || {};
		self.attributes = data;
		return self;
	});
};

/*
	Flush session to disk
*/
Session.prototype.flush = function(force){
	var self = this;

	if(self._dirty || force){
		return self.store.save(self.id, self.attributes)
		.then(function(){
			self._dirty = false;
		});
	} else {
		self._dirty = false;
		return q.resolve();
	}
};
/*
	data [, flush]
	{ key: val }, true
	OR
	key, value [, flush]
	'key', 'val', true
*/
Session.prototype.set = function(){
	var self = this;
	self._dirty = true;

	var forceFlush = false;
	if(_.isObject(arguments[0])){
		self.attributes = _.extend(self.attributes, arguments[0]);
		forceFlush = !!arguments[1];
	} else {
		self.attributes[arguments[0]] = arguments[1];
		forceFlush = !!arguments[2];
	}

	if(forceFlush){
		return self.flush();
	}
	return q.resolve();
};

Session.prototype.get = function(key){
	return this.attributes[key];
};

Session.prototype.destroy = function(){
	this.attributes = {};
	this._dirty = true;
	return this.store.destroy(this.id);
};

Session.prototype.toJSON = function(){
	return this.attributes;
};

module.exports = Session;