'use strict'

var $ = require('jquery'),
    ko = require('knockout'),
    striptags = require('striptags'),
    GalleryViewModel = require('./galleryViewModel');


module.exports = function(el) {
    var configVar = $(el).data('config'),
    galleryViewModel = new GalleryViewModel(window[configVar]);

    galleryViewModel.currentSlide.subscribe(function(){
      updateSocialLinks(galleryViewModel.currentSlide());
    });

    ko.applyBindings(galleryViewModel, el);

    updateSocialLinks(galleryViewModel.currentSlide());
}

function updateFacebook(url) {
	$('.social-share__item--facebook').attr('href', 'http://www.facebook.com/sharer.php?u=' + encodeURI(url));
}

function updatePinterest(url, caption, media) {
  $('.social-share__item--pinterest').attr('href', 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url)
      + '&description=' + encodeURI( striptags(caption) )
      + '&media=' + encodeURI(media));
}

function updateTwitter(caption) {
	$('.social-share__item--twitter').attr('href', 'http://twitter.com/share?text=' + encodeURI( striptags(caption) ) );
}

function updateEmail(title) {
	$('.social-share__item--email').attr('href', 'mailto:?Subject=' + encodeURI( striptags(title) ) );
}

function updateSocialLinks(slide) {
  updateFacebook(slide.url);
  updatePinterest(slide.url, slide.image);
  updateTwitter(slide.caption);
  updateEmail(slide.title);
}