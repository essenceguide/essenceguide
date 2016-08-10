'use strict'

var $ = require('jquery'),
    striptags = require('striptags');

module.exports = function(el) {
  var $el = $(el),
      imageSrc = $el.find('img').attr('src'),
      pageUrl = window.location.href,
      pageTitle = document.title;

  updatePinterest(pageUrl, pageTitle, imageSrc, $el);
}

function updatePinterest(url, caption, media, $imageWrap) {
  $imageWrap.find('.social-share__item--pinterest').attr('href', 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url)
      + '&description=' + encodeURI( striptags(caption) )
      + '&media=' + encodeURI(media));
}