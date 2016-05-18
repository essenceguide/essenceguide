'use strict';

var $ = require('jquery'),
    config = require('../config');

module.exports = function (el) {
  var $el = $(el),
      $html = $('html'),
      $menu = $('.slide-out'),
      $menuText = $('.site-nav__menu-text'),
      $btn = $('.site-nav__menu-btn'),
      $overlay = $('<div>').addClass('overlay'),
      isMenuOpen = false;

  function menuTrigger() {
    if (window.innerWidth <= config.breakpoints.small) {
      menuToggle();
    } else {
      menuOpen();
    }
  }


  // for desktop
  function menuOpen() {
      isMenuOpen = true;
      $html.addClass('menu--is-open');
      $menu.addClass('menu-open');
      $('body').append($overlay);
      $('.overlay').addClass('overlay--is-open')
      addOverlayClass();

      $('.slide-out__close, .overlay--is-open').bind('click', closeMenu);
  }

  function closeMenu() {
    isMenuOpen = false;
    $el.removeClass($el.data('active-state'));
    $html.removeClass('menu--is-open');
    $menu.removeClass('menu-open');
    $menuText.html('menu');
    $overlay.removeClass('overlay--is-open');
    $('.slide-out__close, .overlay--is-open').unbind('click');
  }

  // for mobile
  function menuToggle() {
    isMenuOpen = !isMenuOpen;
    $btn.toggleClass($el.data('active-state'));
    $html.toggleClass('menu--is-open');
    $menu.toggleClass('menu-open');

    toggleMenuText();
    toggleOverlay();
  }

  function toggleMenuText() {
    if (isMenuOpen) {
      $menuText.html('close');
    } else {
      $menuText.html('menu');
    }
  }

  function toggleOverlay() {
    if (isMenuOpen) {
      $('body').append($overlay);
      addOverlayClass();
      $('.slide-out__close, .overlay').bind('click', closeMenu);
    } else {
      $overlay.remove();
      $('.slide-out__close, .overlay').unbind('click');
    }
  }

  function addOverlayClass() {
    setTimeout(function(){
      $overlay.addClass('overlay--is-open');
    }, 0);
  }


  $el.on('click', menuTrigger);

  $(window).resize(function() {
    closeMenu();
  });

}