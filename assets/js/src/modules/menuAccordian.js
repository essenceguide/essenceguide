'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function(el) {
  var $el =$(el),
      menuItemsTarget = $el.data('menu-items'),
      triggerSelector = $el.data('menu-trigger'),
      $menuItems = $el.find(menuItemsTarget);


  $menuItems.each(function() {
    var menuItem = new MenuItem(this, triggerSelector);
    menuItem.close();
  });
};

var currentActiveMenuItem;

function MenuItem(el, triggerSelector) {
  this.$el = $(el);
  this.isOpen = false;
  this.$menuTrigger = this.$el.find(triggerSelector);
  this.activeClass = 'is-open';
  this.CLOSED_HEIGHT = this.$el.find('.menu-group__link').outerHeight();
  this.initialHeight = this.$el.outerHeight();

  this.attachEvents();
}

MenuItem.prototype.attachEvents = function() {
  this.$menuTrigger.on('click', _.bind(this.toggleMenu, this));
};

MenuItem.prototype.open = function() {
  if (currentActiveMenuItem && currentActiveMenuItem != this) {
    currentActiveMenuItem.close();
  }

  currentActiveMenuItem = this;

  this.isOpen = true;
  this.$el.addClass(this.activeClass);
  this.$el.height(this.initialHeight);
};

MenuItem.prototype.close = function() {
  this.$el.removeClass(this.activeClass);
  this.$el.height(this.CLOSED_HEIGHT);
  this.isOpen = false;
};

MenuItem.prototype.toggleMenu = function() {
  if (this.isOpen) {
    this.close();
    console.log('closed');
  } else {
    this.open();
    console.log('opened');
  }
};