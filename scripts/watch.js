const chokidar = require('chokidar');
const compileSASS = require('./compileSASS');
const compileTypescript = require('./compileTypescript');

const watcher = chokidar.watch('packages/pwc-*/src/*.{ts,scss}', {
  ignored: /(^|[\/\\])\../, // ignore dotfiles
  persistent: true,
  ignoreInitial: true
});

async function listener(file) {
  console.log(file);
  if (file.endsWith('.scss')) {
    await compileSASS(file);
  }
  else if (file.endsWith('.ts')) {
    await compileTypescript();
  }
}

watcher.on('add', listener);
watcher.on('change', listener);

console.log('Watcher started!');