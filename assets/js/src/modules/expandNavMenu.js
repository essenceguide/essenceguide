'use strict';

var $ = require('jquery'),
    _ = require('underscore');

var OPEN_DELAY = 600,
    EXIT_DELAY = 500,
    FAST_EXIT_DELAY = 300;

module.exports = function (el) {
  var $el = $(el),
      $navContainer = $el.find('.site-nav__main-nav-list'),
      $navItems = $el.find('.site-nav__main-nav-link'),
      subMenuSelector = $el.data('sub-menu-target'),
      $submenu = $(subMenuSelector);

  // Create Sub Menu / Mega dropdown
  var subMenu = new SubMenu($($el.data('sub-menu-target')));

  // Create Nav Items
  $navItems.each(function() {
    var navItem = new NavItem(this);
    navItem.$el.on('over', function(e, data) {
      if ($(this).data('menu') == 'has-menu') {
        subMenu.open();
        subMenu.displayContentWithId(data.id);
      } else {
        subMenu.closeWithDelay(FAST_EXIT_DELAY);
      }
    });
  });



  $(document).on('touchstart', function(e) {
    // if the touch was not contained within the nav or submenu, close submenu
    var $matchedParent = $(e.target).parents('.site-nav__main-nav-list, ' + subMenuSelector);

    if ($matchedParent.length == 0) subMenu.close();
  });

  // if we mouse leave submenu or nav item container, close submenu
  subMenu.$el.on('mouseleave', _.bind(subMenu.closeWithDelay, subMenu, EXIT_DELAY));
  $navContainer.on('mouseleave', _.bind(subMenu.closeWithDelay, subMenu, EXIT_DELAY));
};


/**
 * Nav Item
 */

function NavItem(el) {
  this.$el = $(el);
  this.id = this.$el.attr('id');
  this.hasBeenTouched = false;

  this.attachEvents();

  NavItem.navItems.push(this);
}

NavItem.navItems = [];

NavItem.resetTouchedState = function(exceptForId) {
  _.each(NavItem.navItems, function(navItem) {
    if (navItem.id == exceptForId) return;

    navItem.resetTouchedState();
  });
};

NavItem.setActiveStates = function(value) {
  _.invoke(NavItem.navItems, 'setActive', value);
};

NavItem.prototype.attachEvents = function() {
  var self = this;

  this.$el.on('mouseover', $.proxy(this.triggerOverEvent, this));

  this.$el.on('touchstart', function(e) {
    if (!self.hasBeenTouched) {
      e.preventDefault();
      self.hasBeenTouched = true;
      NavItem.resetTouchedState(self.id);
      self.triggerOverEvent();
    }
  });
};

NavItem.prototype.setActive = function(value) {
  this.$el[value ? 'addClass' : 'removeClass']('site-nav__main-nav-link--is-open');
};

NavItem.prototype.triggerOverEvent = function() {
  this.$el.trigger('over', {id: this.id});
  NavItem.setActiveStates(false);
  this.setActive(true);
};

NavItem.prototype.resetTouchedState = function() {
  this.hasBeenTouched = false;
  this.setActive(false);
};

/**
 * Sub Menu
 */
function SubMenu(el) {
  this.$el = $(el);
  this.$contentSections = this.$el.find('.expanded-menu__menu-section');
  this.isOpen = false;
  this.closeTimeout = null;
  this.openTimeout = null;


  this.attachEvents();
}

SubMenu.prototype.attachEvents = function() {
  var self = this;

  this.$el.on('mouseenter', function() {
    clearTimeout(self.closeTimeout);
  });

  $(window).on('resize', _.bind(this.close, this));
};

SubMenu.prototype.open = function() {
  var self = this;

  clearTimeout(this.closeTimeout);

  this.openTimeout = setTimeout(function() {
    self.$el.addClass('expanded-menu--is-open');
    self.isOpen = true;
  }, OPEN_DELAY);

};

SubMenu.prototype.hideAllContentSections = function() {
  this.$contentSections.removeClass('expanded-menu__menu-section--is-open');
};

SubMenu.prototype.closeWithDelay = function(delay) {
  var self = this;
  // if sub menu isn't open, don't delay the close by setting delay to 0
  delay = !this.isOpen ? 0 : (delay || this.closeDelay);

  this.closeTimeout = setTimeout(function() {
    self.close();
  }, delay);
};

SubMenu.prototype.close = function() {
  clearTimeout(this.openTimeout);
  NavItem.setActiveStates(false);

  if (!this.isOpen) return;

  this.$el.removeClass('expanded-menu--is-open');
  this.isOpen = false;

};

SubMenu.prototype.displayContentWithId = function(id) {
  this.hideAllContentSections();
  this.$el.find('[data-menu-id="' + id + '"]').addClass('expanded-menu__menu-section--is-open');
};