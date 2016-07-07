'use strict'

var $ = require('jquery'),
    slick = require('slick');

module.exports = function(el) {

    var $el = $(el),
        slickOptions = {
          vertical : true,
          slidesToShow: 4,
          slidesToScroll: 1,
          responsive: [
            {
              breakpoint: 1024,
              settings: {
                vertical : false,
                slidesToShow: 3,
                slidesToScroll: 1,
                variableWidth: true
              }
            },
            {
              breakpoint: 768,
              settings: {
                vertical : false,
                slidesToShow: 2,
                slidesToScroll: 1,
                variableWidth: true
              }
            }
          ]
        };

    $el.slick(slickOptions);
};