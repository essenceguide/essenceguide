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

      try {
        outbrainRefresh();
        refreshADs();
        refreshTealiumTag(galleryViewModel.currentSlide(), galleryViewModel.currentSlideNum());
      }

      catch(err) {
        // handles if ads don't load properly
      }
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

function updateTwitter(url,title) {
	$('.social-share__item--twitter').attr('href', 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&text=' + encodeURI( striptags(title) ) + '&via=EssenceMag');
}

function updateEmail(mailSetting) {
	$('.social-share__item--email').attr('href', 'mailto:?Subject=' + encodeURI( striptags(mailSetting) ) );
}

function updateSocialLinks(slide) {
  updateFacebook(slide.url);
  updateTwitter(slide.url,slide.title);
  updateEmail(slide.mailSetting);
  updatePinterest(slide.url,slide.caption,slide.image);
}

function outbrainRefresh(){
  if (typeof(OBR) !== "undefined" && typeof(OBR.extern) !== "undefined"
    && typeof(OBR.extern.researchWidget) !== "undefined") {
    //OBR.extern.researchWidget();
    OBR.extern.refreshWidget();
  }
}

function refreshTealiumTag(slide, slideNum){
    if (utag && utag.view && typeof(window.Ti) !== "undefined" &&
        typeof(window.Ti.udo_metadata) !== "undefined") {
      window.Ti.udo_metadata.friendly_url = window.location.href;
      var slide_title = slide.title;
      // Strip the HTML available in the text.
      var stripHTML = slide_title.replace(/(<([^>]+)>)/ig, '');
      // Strip the special characters available in the string.
      var stripSpecialCharacter = stripHTML.replace(/[^a-z0-9\s]/gi, '');
      window.Ti.udo_metadata.slide_title = stripSpecialCharacter;
      window.Ti.udo_metadata.page_number = slideNum + 1;
      window.utag.view(window.Ti.udo_metadata);
    }
}

function refreshADs(){
    var ad_slots = [
      'ad-ad_728x90_1',
      'ad-ad_galery_300x250_1',
      'ad-ad_galery_300x250_2',
    ];

    var existing_ads = [];
    // Validate ad slot exists on this page.
    for (var i = 0; i < ad_slots.length; i++) {
      if (document.getElementById(ad_slots[i])) {
        existing_ads.push(ad_slots[i]);
      }
    }
    // Refresh the ADs
   adFactory.refreshAds(existing_ads);
}