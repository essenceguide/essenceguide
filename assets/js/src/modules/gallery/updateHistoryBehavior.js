'use strict';
require('history');
var ko = require('knockout'),
    _ = require('underscore');

module.exports = function() {
  this.setSlideBySlug = function(slug) {
    var slideIndex = _.findIndex(this.slides(), {url: slug});
    if (slideIndex == -1) return;

    this.currentSlideIndex(slideIndex);
  };

  History.Adapter.bind(window, 'statechange', function() { // Note: We are using statechange instead of popstate
    var state = History.getState(); // Note: We are using History.getState() instead of event.state
    this.setSlideBySlug(state.data.slug);
  }.bind(this));

  // update browser history/url when current slide changes
  ko.computed(function() {
    if (this.currentSlide() && this.currentSlide().url) {
        var galleryUrl = this.config.galleryUrl;
        var slideIndex = _.findIndex(this.slides(), {url: this.currentSlide().url});
        if(slideIndex > 0) {
            var slideUrl = this.currentSlide().url;
        }
        else {
            var slideUrl = galleryUrl;
        }

    	if (location.search) {
            var slideUrl = slideUrl+location.search;
        }
        var browserTitle = this.currentSlide().browserTitle + " | Essence.com";
        History.pushState({slug: this.currentSlide().url}, browserTitle, slideUrl);
    }
  }, this);
};