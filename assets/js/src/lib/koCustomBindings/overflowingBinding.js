'use strict';

var ko = require('knockout'),
		hasOverflow = require('../hasOverflow');

ko.bindingHandlers.overflowing = {
	init: function(el, valueAccessor) {
		var observable = valueAccessor();

		observable(hasOverflow(el));
	}
};