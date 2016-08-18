'use strict'

var $ = require('jquery'),
    slick = require('slick');

module.exports = function(el) {

  var $el = $(el),
      $playlist = $el.find('.videos-slider__playlist'),
      playlistItemSel = '.videos-slider__playlist-item',
      videoEmbedID = 'featuredVideoEmbed',
      videoPlayer,
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

    $playlist.slick(slickOptions);

    var featuredPlayer = videojs(videoEmbedID);

    featuredPlayer.ready(function() {

      $playlist.on('click', playlistItemSel, function(e) {
        e.preventDefault();

        if ($('#' + videoEmbedID).hasClass('vjs-ad-playing')) return;

        featuredPlayer.catalog.getVideo($(this).data('video-id'), function(error, video) {
          featuredPlayer.catalog.load(video);
          featuredPlayer.play();
        });
      });
    });

    // featuredPlayer.on('loadedmetadata', function() {
    //   featuredPlayer.overlay({
    //     overlays: [{
    //       align: "bottom-left",
    //       content: "<div class='videos-slider__featured-info'>" +
    //                   "<div class='videos-slider__featured-category'>" + featuredPlayer.mediainfo.tags[0] + "</div>" +
    //                   "<div class='videos-slider__featured-title'>" + featuredPlayer.mediainfo.name + "</div>" +
    //                 "</div>",
    //       start: 'loadeddata',
    //       end: 'ads-ad-started'
    //     },
    //     {
    //       align: "bottom-left",
    //       content: "<div class='videos-slider__featured-info'>" +
    //                   "<div class='videos-slider__featured-category'>" + featuredPlayer.mediainfo.tags[0] + "</div>" +
    //                   "<div class='videos-slider__featured-title'>" + featuredPlayer.mediainfo.name + "</div>" +
    //                 "</div>",
    //       start: 'ads-ad-ended',
    //       end: 'progress'
    //     },
    //     {
    //       align: "bottom-left",
    //       content: "<div class='videos-slider__featured-info'>" +
    //                   "<div class='videos-slider__featured-category'>" + featuredPlayer.mediainfo.tags[0] + "</div>" +
    //                   "<div class='videos-slider__featured-title'>" + featuredPlayer.mediainfo.name + "</div>" +
    //                 "</div>",
    //       start: 'pause',
    //       end: 'play'
    //     }]
    //   });
    // });
};