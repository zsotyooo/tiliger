'use strict';

/*
* Require the path module
*/
const path = require('path');

const config =  {
  projectTitle: 'Vue functional styleguide',
  src: path.join(__dirname, 'src/components'),
  staticPath: path.join(__dirname, 'styleguide'),
  styleguidePath: path.join(__dirname, 'docs'),
};

/*
 * Require the Fractal module
 */
const fractal = module.exports = require('@frctl/fractal').create();
/*
 * Give your project a title.
 */
fractal.set('project.title', config.projectTitle);

/*
 * Tell Fractal where to look for components.
 */
fractal.components.set('path', config.src);

/*
 * Set default preview template
 */
fractal.components.set('default.preview', '@preview');

/*
 * Tell Fractal where to look for documentation pages.
 */
fractal.docs.set('path', config.src);
fractal.docs.set('markdown', true);

/*
 * Tell the Fractal web preview plugin where to look for static assets.
 */
fractal.web.set('static.path', config.staticPath);

/**
 * Templating
 */
// Use Nunjucks as the template engine
// fractal.components.engine('@frctl/nunjucks');
// fractal.docs.engine('@frctl/nunjucks');
// // Look for templates with a ".nunj" extension
// fractal.components.set('ext', '.nunj');
const twigAdapter = require('@frctl/twig')();
fractal.components.engine(twigAdapter);
fractal.components.set('ext', '.twig');

/**
 * Server configuration
 */
fractal.web.set('server.port', 5000);
fractal.web.set('server.sync', true);
fractal.web.set('builder.dest', config.styleguidePath);
fractal.web.set('builder.urls.ext', '.html');

/**
 * Theming
 */
const mandelbrot = require('@frctl/mandelbrot'); // require the Mandelbrot theme module

// create a new instance with custom config options
const theme = mandelbrot({
    skin: "grey",
    // nav: ["docs", "components"]
    // any other theme configuration values here
});
theme.addStatic(`${__dirname}/fractal-dist`, '/app-dist');


fractal.web.theme(theme); // tell Fractal to use the configured theme by default

/**
 * Prevent Bluebird warnings like "a promise was created in a handler but was not returned from it"
 * caused by Nunjucks from polluting the console
 */
// const bluebird = require('bluebird');
// bluebird.config({
//   warnings: false
// });