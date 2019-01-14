const path = require('path');
const SitemapGenerator = require('sitemap-generator');

// create generator
const generator = SitemapGenerator('https://puncsky.com', {
  stripQuerystring: false,
  filepath: path.resolve('./src/client/static/sitemap.xml'),
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});

// start the crawler
generator.start();
