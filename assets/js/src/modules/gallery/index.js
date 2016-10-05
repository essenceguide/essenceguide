'use strict'

var $ = require('jquery'),
    ko = require('knockout'),
    striptags = require('striptags'),
    GalleryViewModel = require('./galleryViewModel');

module.exports = function(el) {
     var configVar = $(el).data('config'),
     galleryViewModel = new GalleryViewModel(window[configVar]);
    galleryViewModel.currentSlide.subscribe(function(){
        if(galleryViewModel.currentSlide().type !== "undefined" &&
                galleryViewModel.currentSlide().type === "image") {
            $(".social-share").css('display','block');
        }
        else if(galleryViewModel.currentSlide().type !== "undefined" &&
              galleryViewModel.currentSlide().type !== "image") {
            $(".social-share").css('display','none');
        }
      updateSocialLinks(galleryViewModel.currentSlide());
      try {
        outbrainRefresh(galleryViewModel.currentSlide());
        triggerLazyLoad_Sticky();
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

ko.bindingHandlers.renderOutbrain = {
    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
        var ref;
        if (typeof(OBR) !== "undefined" && typeof(OBR.extern) !== "undefined" 
            && (ref = window.OBR) != null) {
                ref.extern.researchWidget();
        }
    }
};

function updateFacebook(url,title,media) {
  $('.social-share__item--facebook').attr('href', 'http://www.facebook.com/sharer.php?u=' + encodeURI(url) + '&p=' + encodeURI( striptags(title) ) + '&picture=' + encodeURI(media));
}

function updatePinterest(url, pinterestTitle, media) {
  $('.social-share__item--pinterest').attr('href', 'http://pinterest.com/pin/create/button/?url=' + encodeURI(url)
      + '&description=' + encodeURI( striptags(pinterestTitle) )
      + '&media=' + encodeURI(media));
}

function updateTwitter(url,title) {
	$('.social-share__item--twitter').attr('href', 'http://twitter.com/intent/tweet?url=' + encodeURI(url) + '&text=' + encodeURI( striptags(title) ) + '&via=EssenceMag');
}

function updateEmail(mailSetting) {
	$('.social-share__item--email').attr('href', 'mailto:?Subject=' + encodeURI( striptags(mailSetting) ) );
}

function updateSocialLinks(slide) {
  updateFacebook(slide.url,slide.title,slide.image);
  updateTwitter(slide.url,slide.title);
  updateEmail(slide.mailSetting);
  updatePinterest(slide.url,slide.pinterestTitle,slide.image);
}

function outbrainRefresh(slide){
  if (typeof(OBR) !== "undefined" && typeof(OBR.extern) !== "undefined"
    && typeof(OBR.extern.researchWidget) !== "undefined" && slide.type !== 'ad') {
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
    if ( $("#ad-ad_300x250_2").length > 0 ) {
        var ad_slots = [
          'ad-ad_728x90_1',
          'ad-ad_galery_300x250_1',
          'ad-ad_300x250_2',
        ];
    }
    else {
        var ad_slots = [
          'ad-ad_728x90_1',
          'ad-ad_galery_300x250_1',
        ];
    }

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

// Lazy Loads the AD
function lazyLoad(targetElement, renderElement, stickyAdId, ob_start_marker, ob_end_marker) {
    var viewportWidth = window.matchMedia( "(min-width: 768px)" ).matches;
    $(targetElement).removeAttr('lazyloadedAD');
    // To Lazy Load the AD
    $(window).scroll( function() {
        var wt = $(window).scrollTop();    //* top of the window
        var wb = wt + $(window).height();  //* bottom of the window
        var articlebody = $(targetElement);
        if(viewportWidth){
            var ad_dimensions = ["300x250", "300x600"];
            var ot = articlebody.offset().top;  //* top of object (i.e. advertising div)
            var ob = ot + articlebody.height(); //* bottom of object
        }
        else if (!viewportWidth){
            var ad_dimensions = ["300x50", "300x250", "320x50", "320x320"];
            var ot = articlebody.offset().top;  //* top of object (i.e. advertising div)
            var ob = ot + articlebody.height(); //* bottom of object
        }

        if(!articlebody.attr("lazyloadedAD") && wt<=ob && wb >= ot){
            $(renderElement).append("<div class='panel-separator'></div><div id='" + stickyAdId + "' class='ad'></div>");
            articlebody.attr("lazyloadedAD",true);
            var ad = adFactory.getMultiAd(ad_dimensions);
            ad.setPosition("2");
            ad.write(stickyAdId);
            // Call the sticky AD
            stickyAD(stickyAdId, ob_start_marker, ob_end_marker);
        }
    });
}

// Sticks the AD in the Right Rail
function stickyAD(stickyAdId, ob_start_marker, ob_end_marker) {
    var start_sticky = 0;
    var end_sticky = 0;
    var viewportWidth = window.matchMedia( "(min-width: 1024px)" ).matches;
    if(viewportWidth) {
        $( window ).scroll(function() { // scroll event
            var ob_start_marker_element =  $(ob_start_marker);
            var ob_end_marker_element = $(ob_end_marker);
            var sticky_div_id = "#" + stickyAdId;
            var sticky_ad = $(sticky_div_id);
            if(ob_start_marker_element.length > 0 && ob_end_marker_element.length > 0) {
                // Start the sticky if it reaches the Right Side Outbrain block
                if (($(window).scrollTop() > ob_start_marker_element.offset().top) && (start_sticky == 0)) {
                   start_sticky = 1;
                   if ( $(".node-type-video").length > 0 || $(".node-type-package").length > 0 || $(".page-taxonomy-term").length > 0) {
                        sticky_ad.css({'position': 'fixed','width' : '300px','top': '70px'});
                    }
                    else {
                        sticky_ad.css({'position': 'fixed','width' : '300px','top': '170px'});
                    }
                   //setTimeout(function() {sticky_ad.removeAttr('style');}, 5000);
                }
                // Remove the Sticky if user is scrolling back to the top
                if (($(window).scrollTop() < ob_start_marker_element.offset().top) && (start_sticky == 1)) {
                   sticky_ad.removeAttr('style');
                }

                // Remove the sticky if it reaches the bottom Outbrain Block
                if (($(window).scrollTop() > ob_end_marker_element.offset().top) && (end_sticky == 0)) {
                    end_sticky = 1;
                    sticky_ad.removeAttr('style');
                }
            }
        });
    }
}

// Trigger the Lazy Load and Sticky ADs on the Page Load.
function triggerLazyLoad_Sticky(){
    var targetElement, renderElement, stickyAdId, ob_start_marker, ob_end_marker = '';
    // Assign the target and render elements based on the node type
    if( $(".node-type-article").length > 0 ){
        if ( window.matchMedia("(min-width: 1024px)").matches ) {
            // For Lazy Load
            var targetElement = ".article__body";
            var renderElement = ".sidebar--is-sw";

            // For Sticky AD
            var ob_start_marker = 'div[data-widget-id="SB_10"]';
            var ob_end_marker = 'div[data-widget-id="AR_10"]';
        }
    }
    else if( $(".node-type-gallery").length > 0 ) {
        if ( window.matchMedia("(min-width: 1024px)").matches ) {
            var targetElement = ".related-content";
            var renderElement = ".sidebar-wrap";

            // For Sticky AD
            var ob_start_marker = '.related-content';
            var ob_end_marker = '#disqus_thread';
        }
        else {
            var targetElement = ".footer__wrap";
            var renderElement = ".sidebar--is-sw";
        }
    }
    else if ( $(".node-type-video").length > 0 ) {
        if ( window.matchMedia("(min-width: 1024px)").matches ) {
            var targetElement = ".main-content--has-sw-sidebar > .video-section:eq(1)";
            var renderElement = ".sidebar--is-sw";

            // For Sticky AD
            var ob_start_marker = ".main-content--has-sw-sidebar > .video-section:eq(1)";
            var ob_end_marker = ".main-content--has-sw-sidebar > .video-section:last";
        }
        else {
            var targetElement = ".footer__wrap";
            var renderElement = ".sidebar--is-sw";
        }
    }
    else if ( $(".node-type-package").length > 0 ) {
        if ( window.matchMedia("(min-width: 1024px)").matches ) {
            var targetElement = ".curated-touts > .package-content > .package-section:eq(1)";
            var renderElement = ".sidebar--is-sw";

            // For Sticky AD
            var ob_start_marker = ".curated-touts > .package-content > .package-section:eq(1)";
            var ob_end_marker = ".curated-touts > .package-content > .package-section:last";
        }
        else {
            var targetElement = ".curated-touts > .package-content > .package-section:last";
            var renderElement = ".sidebar--is-sw";
        }
    }
    else if ( $(".page-taxonomy-term").length > 0 ) {
        if ( window.matchMedia("(min-width: 1024px)").matches ) {
            var targetElement = ".g-wrap__flex-wrap > .g-span-xs-12:eq(4)";
            var renderElement = ".sidebar--is-sw";

            // For Sticky AD
            var ob_start_marker = ".g-wrap__flex-wrap > .g-span-xs-12:eq(4)";
            var ob_end_marker = ".g-wrap__flex-wrap > .g-span-xs-12:last";
        }
        else {
            var targetElement = ".footer__wrap";
            var renderElement = ".sidebar--is-sw";
        }
    }


    // Restrict the call to specific pages
    if( $(".node-type-article").length > 0 ||
        $(".node-type-gallery").length > 0 ||
        $(".node-type-video").length > 0 ||
        $(".node-type-package").length > 0 ||
        $(".page-taxonomy-term").length > 0 ) {
            // Don't Change the below sticky ID.
            // It is referred in the Gallery AD Refresh
            // Please update refreshADs() method if this is
            // getting updated or modified.
            var stickyAdId = "ad-ad_300x250_2";
            // Remove the AD if it is already available
            var sticky_div_id = "#" + stickyAdId;
            var sticky_ad = $(sticky_div_id);
            if( sticky_ad.length > 0 ) {
                $(sticky_ad).remove();
            }
            if($(targetElement).length > 0 ) {
                lazyLoad(targetElement, renderElement, stickyAdId, ob_start_marker, ob_end_marker);
            }
    }
}

(function($) {
    $( document ).ready( function() {
       // Trigger the Lazy Load and Sticky.
       triggerLazyLoad_Sticky();
    });
})(jQuery);
