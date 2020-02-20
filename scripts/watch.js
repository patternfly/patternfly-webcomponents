const path = require('path');
const chokidar = require('chokidar');
const compileSASS = require('./util/compileSASS');
const compileTypescript = require('./util/compileTypescript');
const transformHTML = require('./util/transformHTML');
const SASSGraph = require('./util/sassGraph');
const config = require('./util/esdevconfig.json');
const { server } = require('./util/createServer');

const index = {};

const watcher = chokidar.watch([
  'packages/pwc-*/src/*.{ts,scss}',
  'packages/pwc-*/**/*.html',
  'patternfly-next/src/patternfly/**/*.scss'
], {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});
process.on('SIGINT', () => {
  watcher.close();
  process.exit(0);
});

const graph = new SASSGraph();
async function listener(file) {
  console.log(`\x1b[36mtouch ${file}\x1b[0m`);
  if (file.endsWith('.scss')) {
    const fullPath = path.join(process.cwd(), file);
    const webcomponentDependents = graph.visit(graph.graph[fullPath], [fullPath])
      .filter(file => /packages\/pwc-.*\/src\/.*\.scss/.test(file)); // We only care to compile webcomponent SASS

    Promise.all(webcomponentDependents.map(file => compileSASS(file)))
      .then();
  }
  else if (file.endsWith('.ts')) {
    await compileTypescript();
  }
  else if (file.endsWith('.html')) {
    await transformHTML(file);
  }
}

function remover(file) {
  console.log(`\x1b[33mrm ${file}\x1b[0m`);
}

watcher
  .on('add', listener)
  .on('change', listener)
  .on('unlink', remover);

console.log('Watcher started!');

if (process.argv.includes('--serve')) {
  console.log(`es-dev-server running on http://localhost:${config.port}/docs`);
  server.listen(config.port);
}