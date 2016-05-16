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
    var smallHeightTrigger = $header.outerHeight(true);
    var mediumHeightTrigger = $('.article__social-share').height() + $('.article__social-share').offset().top;


    var headroomOptions = {
      onUnpin: function() {
        offset: smallHeightTrigger / 2,
        $el.find('.search-bar').removeClass('is-active');
      }
    }

    if (window.matchMedia("(min-width: 400px)").matches) {
      /* the viewport is at least 400 pixels wide */
      console.log('fart noises');

      $.extend(headroomOptions, {
          offset: mediumHeightTrigger - 75
      });
    } else {
    }



      console.log(headroomOptions);

    var headroom = new Headroom(
      document.querySelector('.site-header__menu-bar'), headroomOptions);

    headroom.init();




  });
};