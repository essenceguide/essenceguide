'use strict';

var $ = require('jquery');
require('stickyKit');

module.exports = function (el) {
  var $el = $(el),
      brandBarH = $('.site-nav__brand-bar').height();

  // DOM element specified by data-js-component="stickyToTop"
  $el.stick_in_parent({
    'offset_top': brandBarH + 10
  });
};