'use strict'

var $ = require('jquery');

module.exports = function(el) {

    var $el = $(el),
        $search = $($el.data('open-target')),
        $searchForm = $search.find('.form-control'),
        $closeIcon = $($el.data('close-target'));

    $el.on('click', function() {
      if ($search.hasClass('is-active')) {
        closeSearch();
      } else {
        openSearch();
      }
    });

    $closeIcon.on('click', closeSearch);

    function openSearch() {
      $search.addClass('is-active')
        .on('transitionend', function onTransitionEnd() {
          $searchForm.focus();
          $search.off('transitionend', onTransitionEnd);
        });
    }

    function closeSearch() {
      $search.removeClass('is-active');
    }
};