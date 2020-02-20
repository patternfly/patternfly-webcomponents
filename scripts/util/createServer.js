const chokidar = require('chokidar');
const { createConfig, createServer } = require('es-dev-server');
const config = require('./esdevconfig.json');

const watcher = chokidar.watch(
  ['docs', 'node_modules/@patternfly/wc-*/*.js'],
  { persistent: false }
);

module.exports = createServer(createConfig(config), watcher);