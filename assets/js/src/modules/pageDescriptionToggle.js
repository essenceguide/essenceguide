'use strict';

var $ = require('jquery');

module.exports = function (el) {
  var $el = $(el),
      $descriptionWrap = $($el.data('description-el')),
      $descriptionToggle = $($el.data('more-toggle-el')),
      descriptionFullHeight = $descriptionWrap.find('p').height(),
      descriptionOpen = false;

  $descriptionToggle.on('click', toggleDescription);

  $(window).on('resize', function() {
    descriptionFullHeight = $descriptionWrap.find('p').height();
  });

  function toggleDescription() {
    if (descriptionOpen == false) {

      $descriptionWrap.css('height', 'auto');
      $descriptionToggle.text('Less');

    } else {
      $descriptionWrap.removeAttr('style');
      $descriptionToggle.text('More');
    }

    descriptionOpen = !descriptionOpen;
  }
}