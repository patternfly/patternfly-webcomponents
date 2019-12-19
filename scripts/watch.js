const path = require('path');
const chokidar = require('chokidar');
const compileSASS = require('./util/compileSASS');
const compileTypescript = require('./util/compileTypescript');
const SASSGraph = require('./util/sassGraph');
const config = require('./util/esdevconfig.json');
const { server } = require('./util/createServer');

const watcher = chokidar.watch([
  'packages/pwc-*/src/*.{ts,scss}',
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
  console.log(`\x1b[36m${file}\x1b[0m`);
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
}

watcher
  .on('add', listener)
  .on('change', listener);

console.log('Watcher started!');

if (process.argv.includes('--serve')) {
  console.log(`es-dev-server running on http://localhost:${config.port}`);
  server.listen(config.port);
}