'use strict';

var $ = require('jquery');

module.exports = function (el) {
  var $el = $(el),
      activeClass = $el.data('active-class');

    $el.find('.etr-dropdown__group').dropdown_jq({
      trigger: $el.data('trigger'),
      hideDelay: 3000,
      mouseLeaveDelay: 1000,
      toggledClass: 'etr-dropdown__group--is-open',
      showCallback: function() {
        $el.addClass(activeClass);
      },
      hideCallback: function() {
        $el.removeClass(activeClass);
      }
    });
}
