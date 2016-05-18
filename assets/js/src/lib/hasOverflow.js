var $ = require('jquery');

'use strict';

module.exports = function(el) {
  return $(el).outerHeight(true) == $(el).parent().height() || $(el).height() > $(el).parent().height();
}