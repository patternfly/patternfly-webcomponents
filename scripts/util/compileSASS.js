const { promisify } = require('util');
const fs = require('fs-extra');
const render = promisify(require('node-sass').render);

async function compileSASS(file) {
  const t0 = process.hrtime();
  render({
    file,
    // data: fs.readFileSync(file, 'utf8'),
    outputStyle: 'compressed'
  })
    .then(compiled => {
      const tsTemplate = `
import { css } from 'lit-element';
export default css\`${compiled.css.toString().trim()}\`;
        `;
      const toFile = file.replace(/.scss$/, '.css.ts');
      
      fs.writeFileSync(toFile, tsTemplate.trim());
      const t1 = process.hrtime();
      console.log(`\x1b[32mCompiled SCSS to ${toFile} in ${(t1[0] - t0[0]) * 1000 + (t1[1] - t0[1]) / 1000000}ms\x1b[0m`);
    })
    .catch(err => console.error(`${err.file}\n${err.formatted}`));
}

module.exports = compileSASS;