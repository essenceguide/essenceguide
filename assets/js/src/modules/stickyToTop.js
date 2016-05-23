'use strict';

var $ = require('jquery');

module.exports = function (element) {
  // DOM element specified by data-js-component="stickyToTop"
  $(element).stick_in_parent({
    'parent' : 'body'
  });
};