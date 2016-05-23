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

  // update browser history/url when current slide changes (and when title card
  // is removed which sets url to url of first slide)
  ko.computed(function() {
    if (this.currentSlide() && this.currentSlide().url) {
      History.pushState({slug: this.currentSlide().url}, this.currentSlide().browserTitle, this.currentSlide().url);
    }
  }, this);
};