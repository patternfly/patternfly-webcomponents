const glob = require('glob');
const fs = require('fs-extra');
const compileTypescript = require('./util/compileTypescript');
const compileSASS = require('./util/compileSASS');
const transformHTML = require('./util/transformHTML');

const patternflyPath = require.resolve('@patternfly/patternfly/package.json');
fs.copySync(patternflyPath.replace('package.json', 'assets'), '../docs/assets');
console.log('Copied assets from @patternfly/patternfly to docs/assets');

glob.sync('packages/pwc-*/**/*.html').forEach(file => transformHTML(file));
console.log('Wrote HTML files to docs');
glob.sync('packages/pwc-*/src/*.scss').forEach(file => compileSASS(file));
console.log('Compiled SCSS files');
compileTypescript();