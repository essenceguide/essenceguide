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

    videojs(videoEmbedID).ready(function() {
      videoPlayer = this;

      $playlist.on('click', playlistItemSel, function(e) {
        e.preventDefault();

        videoPlayer.catalog.getVideo($(this).data('video-id'), function(error, video) {
          videoPlayer.catalog.load(video);
          videoPlayer.play();
        });
      });
    });
};