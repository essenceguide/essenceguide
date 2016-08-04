'use strict';

var $ = require('jquery');
require('waypoints');
require('waypointsSticky');

module.exports = function (el) {
  var $el = $(el),
      topOffset = 65,
      stickySidebar = new Waypoint.Sticky({
        element: el,
        offset: topOffset
      }),
      $sidebarContainer = $el.closest('.page-container'),
      $articleBodyWrap = $('.article__body').last(),
      $sidebarHaltEl = ( ($articleBodyWrap.length) ? $articleBodyWrap : $sidebarContainer ),
      sidebarHalt = new Waypoint({
      element: $sidebarHaltEl,
      handler: function(direction) {
        console.log(direction);
        if (direction === 'down') {
          var staticOffset = $el.offset().top;
          $el.addClass('force-unstick').css('top', staticOffset);

        } else if (direction === 'up') {

          $el.removeClass('force-unstick').css('top', topOffset);

        }
      },
      offset: 'bottom-in-view'
    });
};