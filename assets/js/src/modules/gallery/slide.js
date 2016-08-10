'use strict';

var $ = require('jquery');

function Slide(slideData) {
  $.extend(this, slideData);

  if (slideData.type !== 'image') return this;

  var size = this.getImageSize(this);
  this.image = size.src;
  this.width = size.width;
  this.height = size.height;

  if (this.width == this.height) {
    this.orientationClass = 'gallery__image--square';
  } else {
    this.orientationClass = (this.width < this.height) ? 'gallery__image--portrait' : 'gallery__image--landscape'
  }

};

Slide.prototype.getImageSize = function(slide) {

  if (!slide.imagesrc) return;

  var breakpoints = [
    {
      mq: '(min-width: 1280px)',
      src: slide.imagesrc.lg,
    },
    {
      mq: '(min-width: 1024px)',
      src: slide.imagesrc.md,
    },
    {
      mq: '(min-width: 768px)',
      src: slide.imagesrc.sm,
    },
    {
      mq: '(min-width: 480px)',
      src: slide.imagesrc.xs,
    },
    {
      mq: '(min-width: 0px)',
      src: slide.imagesrc.xxs
    }
  ];

  for (var i = 0; i < breakpoints.length; i++) {
    if ((window.matchMedia( breakpoints[i].mq ).matches)) {
      return breakpoints[i].src;
    }
  }
}

module.exports = Slide;