var _ = require('lodash');
var q = require('q');

function Store(){

};

// get data from the store
Store.prototype.get = function(id){
	return q.resolve();
};

// save data to the store
Store.prototype.save = function(id, data){
	return q.resolve();
};

module.exports = Store;

