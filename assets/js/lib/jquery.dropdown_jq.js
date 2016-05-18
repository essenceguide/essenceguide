;(function($) {

  'use strict';

  var pluginName = 'dropdown',
    namespace = 'plugin_' + pluginName;

  /*-------------------------------------------- */
  /** Plugin Defaults */
  /*-------------------------------------------- */

  var defaults = {
    trigger: null,
    displayEvent: 'click',
    hideDelay: 3000,
    mouseLeaveDelay: 500,
    toggledClass: 'active',
    showCallback: $.noop,
    hideCallback: $.noop
  };

  /*-------------------------------------------- */
  /** Helpers */
  /*-------------------------------------------- */

  function callMethod(instance, method, args) {
    if ( $.isFunction(instance[method]) ) {
      instance[method].apply(instance, args);
    }
  }

  /*-------------------------------------------- */
  /** Plugin Constructor */
  /*-------------------------------------------- */

  function Plugin(el, opts) {
    this.options = $.extend({}, defaults, opts);
    this.$el = $(el);

    this._init();
  }

  Plugin._hideActiveDropdown = function() {
    if (Plugin._activeDropdown) {
      Plugin._activeDropdown.hide();
      Plugin._clearActiveDropdownTimeout();
    }
  };

  Plugin._clearActiveDropdownTimeout = function() {
    clearTimeout(Plugin._hideTimeout);
    clearTimeout(Plugin._mouseLeaveTimeout);
    Plugin._activeDropdown = null;
  };

  Plugin._setActiveDropdown = function(active) {
    // hide the current active dropdown (may or may not exist)
    Plugin._hideActiveDropdown();

    // set the new dropdown as the active one
    Plugin._activeDropdown = active;

    // start a timeout to hide the dropdown after hideDelay threshold is eclipsed
    Plugin._hideTimeout = setTimeout(function() {
      Plugin._hideActiveDropdown();
    }, active.options.hideDelay);
  };

  $.extend(Plugin.prototype, {

  /*-------------------------------------------- */
  /** Private Methods */
  /*-------------------------------------------- */

    _init: function() {
      this._addListeners();
    },

    _addListeners: function() {
      var self = this;

      this.$el.on('mouseleave', function(e) {
        Plugin._mouseLeaveTimeout = setTimeout($.proxy(self.hide, self), self.options.mouseLeaveDelay);
      });

      this.$el.on('mouseenter', function(e) {
        Plugin._clearActiveDropdownTimeout();
      });

      if (this.options.trigger) {
        $(this.options.trigger).on(this.options.displayEvent, function(e) {
          self.show();
        });
      }
    },

  /*-------------------------------------------- */
  /** Public Methods */
  /*-------------------------------------------- */

    show: function() {
      // if the element is already shown, return
      if ( this.$el.hasClass(this.options.toggledClass) ) return;

      Plugin._setActiveDropdown(this);

      this.$el.addClass(this.options.toggledClass);
      this.options.showCallback();
    },

    hide: function() {
      // if the dropdown is already hidden, return
      if ( !this.$el.hasClass(this.options.toggledClass) )return;

      this.$el.removeClass(this.options.toggledClass);
      this.options.hideCallback();
    },

    destroy: function() {
      this.$el.off('mouseleave, mouseenter');

      if (this.options.trigger) {
        $(this.options.trigger).off(this.options.displayEvent);
      }
    }
  });

  /*-------------------------------------------- */
  /** Plugin Definition */
  /*-------------------------------------------- */

  $.fn.dropdown_jq = function(options) {

    var method = false,
      methodArgs = arguments;

    if (typeof options == 'string') {
      method = options;
    }

    return this.each(function() {
      var plugin = $.data(this, namespace);

      if (!plugin) {
        $.data(this, namespace, new Plugin(this, options));
      } else if (method) {
        callMethod(plugin, method, Array.prototype.slice.call(methodArgs, 1));
      }
    });
  };

}(jQuery));