'use strict';

var Headroom = require('headroom.js');

module.exports = function(el) {
  var $el = $(el),
      $header = $('.article__header'),
      $body = $('.article__body');

  // exit early if this is a basic navigation
  // that doesn't need any of the fancy stuff
  if ($el.hasClass('basic-nav')) return false;

  $( window ).load(function() {
    // var smallHeightTrigger = $header.outerHeight(true);
    // var mediumHeightTrigger = $('.article__social-share').height() + $('.article__social-share').offset().top;


    var headroomOptions = {useTouchmove: true}

    if (window.matchMedia("(min-width: 400px)").matches) {
      /* the viewport is at least 400 pixels wide */

      // $.extend(headroomOptions, {
      //     offset: mediumHeightTrigger - 75
      // });
    } else {
    }

    var headroom = new Headroom(
      document.querySelector('.site-nav__brand-bar'), headroomOptions);

    headroom.init();




  });
};