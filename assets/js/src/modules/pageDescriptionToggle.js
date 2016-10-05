'use strict';

var $ = require('jquery');

module.exports = function (el) {
  var $el = $(el),
      $descriptionWrap = $($el.data('description-el')),
      $descriptionToggle = $($el.data('more-toggle-el')).not('.no-toggle'),
      descriptionOpen = false;

  toggleMore();

  $descriptionToggle.on('click', toggleDescription);

  $(window).on('resize', function() {
    toggleMore();
  });

  function toggleDescription() {
    if (descriptionOpen == false) {
      $descriptionWrap.css('height', 'auto');
      $descriptionToggle.text('Less').addClass('load-more__text--less');
    } else {
      $descriptionWrap.removeAttr('style');
      $descriptionToggle.text('More').removeClass('load-more__text--less');
    }

    descriptionOpen = !descriptionOpen;
  }

  function toggleMore() {
    var scrollHeight = $descriptionWrap.get(0).scrollHeight;
    var clientHeight = $descriptionWrap.get(0).clientHeight;

    $descriptionWrap.removeAttr('style');
    if (scrollHeight > clientHeight) {
      $descriptionToggle.show();
    } else {
      $descriptionToggle.hide();
      $descriptionToggle.text('More').removeClass('load-more__text--less');
      descriptionOpen = false;
    }
  }
};
