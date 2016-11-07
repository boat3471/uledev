var express = ule.express = require('express');
var expressApp = ule.app = express();

module.exports = function(port){
	expressApp.set('port', port);
	// require('./web/favicon');
	// require('./web/logger');
	// require('./web/parser');
	// require('./web/cookie');
	require('./web/views');
};