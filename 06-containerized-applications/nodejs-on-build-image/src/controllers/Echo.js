'use strict';

var util = require('util');

exports.hello = function hello (req, res, next) {
    var name = req.swagger.params.name.value || 'lqshow';

  	var hello = util.format('Hello1, %s!', name);

  	// this sends back a JSON response which is a single string
  	res.json(hello);
};