var _ = require('lodash');
var q = require('q');
var Session = require('./session');
var uuid = require('uuid');

function Manager(store){
	this.store = store;
};

Manager.prototype.createSession = function(id){
	if(!id){
		id = uuid.v1();
	}

	return new Session(this.store, id);
};

module.exports = Manager;