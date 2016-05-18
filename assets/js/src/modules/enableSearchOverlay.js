'use strict';

var $ = require('jquery');

module.exports = function (el) {
  var $el = $(el),
      $html = $('html'),
      $searchOverlay = $('.search-overlay'),
      $searchInput = $searchOverlay.find('.form-full-width__input'),
      $searchCloseBtn = $('.search-overlay__close'),
      isOpen = false;

  function openSearchOverlay() {
    $searchOverlay.addClass($searchOverlay.data('active-class'));
    $searchInput.focus();
    $html.addClass('fixed');
    isOpen = true;
    $el.add($searchInput).bind('keydown', function(e) {
      closeWithEscapeKey(e);
    });
  }

  function closeSearchOverlay() {
    $searchOverlay.removeClass($searchOverlay.data('active-class'));
    $html.removeClass('fixed');
    $el.add($searchInput).unbind('keydown');
    isOpen = false;
    $searchInput.blur();
  }

  function closeWithEscapeKey(e) {
    if (isOpen && e.keyCode == 27) {
      closeSearchOverlay();
    }
  }

  $(el).on('click', function(e) {
    e.preventDefault();
    openSearchOverlay();
  });


  $searchCloseBtn.on('click', closeSearchOverlay);
}