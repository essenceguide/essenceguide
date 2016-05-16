'use strict'

var $ = require('jquery'),
    slick = require('slick');

module.exports = function(el) {
    var $el = $(el);
    var slickTarget = $el.data('slider-target')

    $(slickTarget).slick({
      prevArrow: $('.content-slider__btn--prev'),
      nextArrow: $('.content-slider__btn--next')
    });
};