const glob = require('glob');
const fs = require('fs-extra');
const compileTypescript = require('./util/compileTypescript');
const compileSASS = require('./util/compileSASS');

const patternflyPath = require.resolve('@patternfly/patternfly/package.json');
fs.copySync(patternflyPath.replace('package.json', 'assets'), '../demos/assets');
console.log('Copied assets from @patternfly/patternfly to demos/assets');

glob.sync('packages/pwc-*/src/*.scss').forEach(file => compileSASS(file));
compileTypescript();