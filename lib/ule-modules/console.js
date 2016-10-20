/** Created by xinwenchao on 2016/9/7. */
var assert = require('assert'); 

global.log = function(){};
global.info = function(){};
global.warn = function(){};
global.error = function(){};
global.dblog = function(){};
global.dberr = function(){};

global.log = add('log', 'log');
global.info = add('info', 'info');
global.warn = add('warn', 'warn');
global.error = add('error', 'error');
global.dblog = add('dblog', 'log', 'DB');
global.dberr = add('dberr', 'error', 'DB');

global.assert = function(value){
	assert(0, value);
};
global.assertFail = function(value){
	assert.fail(value);
};

function add(name, type, prefix){
	if(!name) return;
	type = type || 'log';
	prefix = prefix || 'ULEDEV';
	prefix.length < 6 && (prefix = ('ULEDEV'.substring(0, Math.ceil(6 - prefix.length) / 2) + prefix + '------').substring(0, 6));
	return function(){
		var args = Array.prototype.slice.call(arguments);
		args.unshift('[' + prefix + ']');
		console[type].apply(console, args);
	};
}