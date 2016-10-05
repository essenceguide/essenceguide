'use strict';

var $ = require('jquery');
require('waypoints');

module.exports = function () {
  toggleSticky();

  $(window).scroll(function() {
    toggleSticky();
  });

  $(window).resize(function() {
    toggleSticky();
  });

  function toggleSticky() {
    var $spacer = $('.site_nav__sticky-spacer');
    var $brandBar = $('.site-nav__brand-bar');
    var $headBoard = $('.site-nav__headboard');
    var navHeight = $brandBar.height();
    var scrollPos = 0;

    if ($headBoard.is(':visible')) {
      scrollPos = $headBoard.height();
    }

    if (document.body.scrollTop > scrollPos) {
      $spacer.height(navHeight);
      $brandBar.addClass('is_stuck');
    } else {
      $spacer.removeAttr('style');
      $brandBar.removeClass('is_stuck');
    }
  }
};