'use strict'


var $ = require('jquery'),
    ko = require('knockout');

var BaseGalleryViewModel = require('../../modules/_baseGallery/baseGalleryViewModel');

module.exports = ResponsiveImages;

function ResponsiveImages(config) {
	
	 // Sets slides from gallery Config in template
	  this.config = config;
	  // replace repsonsive images
	  this.alterImage = ko.pureComputed(function () {
		  $.each(config.slides, function() {
			  
			  if (typeof this.imagesrc !== "undefined") {
				  
				    if(typeof this.imagesrc.original !== "undefined"){
				    		this.image = this.imagesrc.original;
				
				    }
				    else if(window.matchMedia( "(min-width: 1280px)" ).matches){
				    	this.image = this.imagesrc.lg;
					}
					else if (window.matchMedia( "(min-width: 1024px)" ).matches) {
					 	this.image = this.imagesrc.md;
					}
					else if (window.matchMedia( "(min-width: 768px)" ).matches) {
					 	this.image = this.imagesrc.sm;
					}
					else if (window.matchMedia( "(min-width: 480px)" ).matches) {
					 	this.image = this.imagesrc.xs;
					}
					else{
					 	this.image = this.imagesrc.xxs;
					}
			 	 }
			  
			});
	  return config;
	  }, this);
	
}

ResponsiveImages.prototype = Object.create(BaseGalleryViewModel.prototype);