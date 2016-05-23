'use strict';

var $ = require('jquery'),
    _ = require('underscore');

module.exports = function (el) {
  var $menuItems = $(el).find('.slide-out-menu__list-item');

  $menuItems.each(function() {
    var menuItem = new MenuItem(this);
    menuItem.close();
  });
};
// expose on Drupal Behaviors
var currentActiveMenuItem;

function MenuItem(el) {
  this.$el = $(el);
  this.isOpen = false;
  this.$menuTrigger = this.$el.find('.slide-out-menu__list-more');
  this.activeClass = 'slide-out-menu__list-item--is-open';
  this.CLOSED_HEIGHT = this.$el.find('.slide-out-menu__list-link').outerHeight();
  this.initialHeight = this.$el.outerHeight() + 1;

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
  } else {
    this.open();
  }
};