const { promisify } = require('util');
const exec = promisify(require('child_process').exec);

async function compileTypescript() {
  const t0 = process.hrtime();
  exec('yarn build:typescript')
    .then(() => {
      const t1 = process.hrtime();
  console.log(`\x1b[32mCompiled TS   (everything) in ${(t1[0] - t0[0]) * 1000 + (t1[1] - t0[1]) / 1000000}ms\x1b[0m`);
    })
    .catch(err => console.error(err.stdout));
}

module.exports = compileTypescript;