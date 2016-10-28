var express = require('express');
var expressApp = express();
var uledev = {
	app: expressApp,
	express: express,
	init: function(){
		module.exports = expressApp;
		// require('./ule-modules/favicon');
		// require('./ule-modules/logger');
		// require('./ule-modules/parser');
		// require('./ule-modules/cookie');
		require('./hosts');
		require('./views');
	}
};
global.uledev = uledev;
uledev.init();