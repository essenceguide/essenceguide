'use strict';

var $ = require('jquery');
require('waypoints');

module.exports = function (el) {
	var $el = $(el),
		$quickShareHeader = $($el.data('share-header')),
		shareHeaderWaypoint = new Waypoint({
			element: el,
			handler: function(direction) {
				if (direction === 'down') {
					$quickShareHeader.fadeIn('fast');
				} else if (direction === 'up') {
					$quickShareHeader.fadeOut('fast');
				}
			}
		});
};