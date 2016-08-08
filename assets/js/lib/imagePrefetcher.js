/**
 * Keeps track of images that have been prefetched already
 * @type {Object}
 */
var prefetchedImages = {};

/**
 * Prefetches an image from the provided imageUrl
 *
 * @param  {string...} imageUrl The URL of the image to prefetch. Multiple paths can be provided as separate arguments
 */
module.exports = function prefetchImage() {
    var paths = arguments,
        path;

    for (var i = 0, len = paths.length; i < len; i++) {
        path = paths[i];

        if ( !path || hasImageBeenPrefetched(path) ) continue;

        markAsPrefetched( prefetch(path) );
    }
};

function prefetch(imagePath) {
    var img = new Image();
    img.src = imagePath;

    return imagePath;
}

function markAsPrefetched(imagePath) {
    prefetchedImages[imagePath] = true;
}

function hasImageBeenPrefetched(imagePath) {
    return prefetchedImages[imagePath];
}