'use strict';

var $ = require('jquery'),
    config = require('../config');

require('waypoints');
require('waypointsSticky');


module.exports = function (el) {
  var $el = $(el),
      topOffset = 170,
      $sidebarContainer = $el.closest('.page-container'),
      $bodyStopEl = $($el.data('sticky-stop-el')).last() || $('.article__body').last(),
      $sidebarHaltEl = ( ($bodyStopEl.length) ? $bodyStopEl : $sidebarContainer ),
      mqlAboveTablet = window.matchMedia("(min-width:" + config.breakpoints.medium + "px)"),
      stickySidebar,
      sidebarHalt;

  function createStickySidebar() {
    return new Waypoint.Sticky({
      element: el,
      offset: topOffset,
      continuous: false
    });
  }

  function createSidebarHalt() {
    return new Waypoint({
      element: $sidebarHaltEl[0],
      handler: function(direction) {

        if (direction === 'down') {
          var staticOffset = $el.offset().top;
          $el.addClass('force-unstick').css('top', staticOffset);

        } else if (direction === 'up') {

          $el.removeClass('force-unstick').css('top', topOffset);

        }
      },
      offset: 'bottom-in-view',
      continuous: false
    })
  }

  function initSticky() {
    stickySidebar = createStickySidebar();
    sidebarHalt = createSidebarHalt();
  }

  // creates waypoints for the sticky sidebar functionality if we're above tablet
  if (mqlAboveTablet.matches) initSticky();

  mqlAboveTablet.addListener(function(mql) {
    // removes the force-unstick class if it's there when we go to tablet
    if (mql.matches) {
      initSticky();
    } else {
      console.log(stickySidebar);
      stickySidebar && stickySidebar.destroy();
      sidebarHalt && sidebarHalt.destroy();
    }
  });
};