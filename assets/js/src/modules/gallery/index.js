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
      outbrainRefresh();
      refreshADs();
      refreshTealiumTag(galleryViewModel.currentSlide(), galleryViewModel.currentSlideNum());
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
  updateTwitter(slide.caption);
  updateEmail(slide.title);
  updatePinterestImage(slide);
}

//Update the image data in pinrest

function updatePinterestImage(slide){
	if (typeof slide.image !== "undefined") {
		 if(typeof slide.image.original !== "undefined"){
			 updatePinterest(slide.url,slide.caption, slide.image.original);
	       }
		 else if(window.matchMedia( "(min-width: 1280px)" ).matches){
				 updatePinterest(slide.url,slide.caption, slide.image.lg);
			}
			else if (window.matchMedia( "(min-width: 1024px)" ).matches) {
				 updatePinterest(slide.url,slide.caption, slide.image.md);
			}
			else if (window.matchMedia( "(min-width: 768px)" ).matches) {
				 updatePinterest(slide.url, slide.caption,slide.image.sm);
			}
			else if (window.matchMedia( "(min-width: 480px)" ).matches) {
				 updatePinterest(slide.url,slide.caption, slide.image.xs);
			}
			else{
				 updatePinterest(slide.url,slide.caption, slide.image.xss);

			}
	}
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

