'use strict';

var ko = require('knockout'),
    $ = require('jquery');

ko.bindingHandlers.adContainer = {

    init: function (element, valueAccessor, allBindings, viewModel, bindingContext) {
      var data = {
        id: element.id,
        adData: bindingContext.$data,
        galleryData: bindingContext.$root.config
      };

      $(document).trigger('slGallery:displayAd', data);

      ko.utils.domNodeDisposal.addDisposeCallback(element, function() {
        $(document).trigger('slGallery:removedAd', data);
      });

     // Render the Interstitial ADs
     try {
       var ad = adFactory.getAd("300x250");
       ad.setParam("dcopt", "ist");
       ad.setParam("pos", "3");
       ad.write("ad-gallery_interstitial_ad");
     }

     catch(err) {
      // wrapping in try for local dev
     }
    }
};