var componentRegistry = require('./lib/componentRegistry'),
    svg4everybody = require('svg4everybody');

/*-------------------------------------------- */
/** Instantiate Modules */
/*-------------------------------------------- */


/*
    data-js-component="moduleName" goes on your module's markup
    componentRegistry.registerComponent('moduleName', require('./modules/moduleName'));
*/

componentRegistry.registerComponent('contentSlider', require('./modules/contentSlider'));
componentRegistry.registerComponent('navAccordian', require('./modules/navAccordian'));
componentRegistry.registerComponent('dropdownToggle', require('./modules/dropdownToggle'));
componentRegistry.registerComponent('stickyToTop', require('./modules/stickyToTop'));
componentRegistry.registerComponent('toggleSearch', require('./modules/toggleSearch'));
componentRegistry.registerComponent('sideMenuToggle', require('./modules/sideMenuToggle'));
componentRegistry.registerComponent('enableMenu', require('./modules/enableMenu'));
componentRegistry.registerComponent('enableSearchOverlay', require('./modules/enableSearchOverlay'));
componentRegistry.registerComponent('expandNavMenu', require('./modules/expandNavMenu'));

componentRegistry.registerComponent('gallery', require('./modules/gallery'));

componentRegistry.initComponents();
/*-------------------------------------------- */
/** End Modules */
/*-------------------------------------------- */

svg4everybody();