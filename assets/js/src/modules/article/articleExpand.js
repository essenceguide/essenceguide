'use strict'

var $ = require('jquery');

module.exports = function(el) {
  var $el = $(el),
      $articleBody = $('.article__body'),
      collapsedClass = 'article__body--collapsed';

  $el.on('click', function() {
    $articleBody.removeClass(collapsedClass);
    $el.hide();
  });
}