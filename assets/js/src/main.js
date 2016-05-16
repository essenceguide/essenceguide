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
componentRegistry.registerComponent('menuAccordian', require('./modules/menuAccordian'));
componentRegistry.registerComponent('stickyNav', require('./modules/stickyNav'));
componentRegistry.registerComponent('toggleSearch', require('./modules/toggleSearch'));
componentRegistry.registerComponent('sideMenuToggle', require('./modules/sideMenuToggle'));

componentRegistry.initComponents();
/*-------------------------------------------- */
/** End Modules */
/*-------------------------------------------- */

svg4everybody();