'use strict';

var $ = require('jquery');
require('waypoints');

module.exports = function (el) {
	var $el = $(el);

	// DOM element specified by data-js-component="stickyToTop"
	$el.stick_in_parent({
	'parent' : 'body'
	});
};