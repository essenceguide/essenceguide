'use strict'

require('../../lib/koCustomBindings/overflowingBinding');
require('./adContainerBinding');

var $ = require('jquery'),
    ko = require('knockout'),
    _ = require('underscore'),
    hammer = require('hammerjs'),
    prefetchImages = require('../../lib/prefetchImages');

var BaseGalleryViewModel = require('../../modules/_baseGallery/baseGalleryViewModel');

module.exports = GalleryViewModel;

function GalleryViewModel(config) {
  BaseGalleryViewModel.call(this);

  // Sets slides from gallery Config in template
  this.config = config;

  this.slides(config.slides);
  this.totalSlideCount(config.galleryTotalSlideCount);
  this.currentSlideIndex(config.initialSlideIndex || 0);


  // create array of slides without ads so we can track current slide number to
  // display in gallery without it including ad slides.
  this.slidesWithoutAds = _.reject(this.slides(), {type: 'ad'});

  this.currentSlideNum = ko.pureComputed(function () {
      return _.indexOf(this.slidesWithoutAds, this.currentSlide()) + 1;
  }, this);

  this.galleryUrl = ko.observable(config.galleryUrl);
  this.title = ko.observable(config.galleryTitle);
  this.description = ko.observable(config.galleryDescription);

  // prefetch the next slide image
  this.currentSlide.subscribe(function(newSlide) {
    if (!this.isLastSlide()) {
      prefetchImages(this.slides()[this.currentSlideIndex() + 1].image);
    }
  }, this);

  // is the current slide an ad?
  this.isNotAdSlide = ko.pureComputed(function () {
      return this.currentSlide().type != 'ad';
  }, this);

  this.slideMediaType = ko.pureComputed(function() {
    if (!this.currentSlide()) return;

    // TODO: UPDATE WITH CORRECT NAMING CONVENTION
    if (this.currentSlide().type == 'video') {
      return 'gallery__media--video';
    } else if (this.currentSlide().type == 'image') {
      return 'gallery__media--image'
    } else {
      return 'gallery__media--ad'
    }

  }, this);

  this.gotoNextSlide = function() {
    // remove title card if it is displayed when user goes to next slide
    if (this.isLastSlide() && config.nextContentUrl) {
      // navigate to next gallery url
      window.location = config.nextContentUrl;
    } else {
      BaseGalleryViewModel.prototype.gotoNextSlide.call(this);
    }
  };

  this.imageCredit = function() {
    if ( this.currentSlide().imageCredit) {
      return this.currentSlide().imageCredit;
    }
  }

  // update template based on slide type
  this.templateType = function(slide) {
    if (slide.type == 'image') {
      return 'image-slide-template';
    } else if (slide.type == 'video') {
      return 'video-slide-template';
    } else if (slide.type == 'ad') {
      return 'ad-slide-template';
    }
  };

  if (config.updateHistory) {
    require('./updateHistoryBehavior').call(this);
  }
}

GalleryViewModel.prototype = Object.create(BaseGalleryViewModel.prototype);
