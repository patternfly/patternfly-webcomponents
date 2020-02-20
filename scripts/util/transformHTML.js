const path = require('path');
const fs = require('fs');

console.log('required');
const index = {};

function writeIndex() {
  const html = `<!DOCTYPE html>
  <html lang="en-us">
    <head>
      <meta charset="utf-8">
      <title>PatternFly web components</title>
    </head>
    <body>
      <section class="pf-c-page__main-section" style="padding: 20px">
        <ul>
          ${Object.keys(index)
            .sort()
            .map(item => `<li><a href="/docs/${item}.html">${item}</a></li>`).join('\n          ')}
        </ul>
      </section>
    </body>
  </html>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'docs/index.html'),
    html
  );
}

const pwcRegex = /<\s*(pwc-[\w-]+)[\s>]/g;

async function transformHTML(file) {
  const component = path.dirname(file).split(path.sep).pop(); // pwc-button
  const html = fs.readFileSync(file, 'utf8').replace(/\n/g, '\n      ').trim();
  const usedComponents = {};
  let match;
  while ((match = pwcRegex.exec(html)) !== null) {
    usedComponents[match[1]] = true;
  }
  const newHTML = `<!DOCTYPE html>
<html lang="en-us">
  <head>
    <meta charset="utf-8">
    <title>${component} demo</title>
    <link rel="stylesheet" href="variables.css">
  </head>
  <body>
    <section class="pf-c-page__main-section" style="padding: 20px">
      ${html}
    </section>
    ${Object.keys(usedComponents)
      .map(used => `<script type="module" src="../node_modules/@patternfly/${component}/${used}.js"></script>`)
      .join('\n    ')}
  </body>
</html>`;

  fs.writeFileSync(
    path.join(process.cwd(), 'docs', `${component}.html`),
    newHTML
  );
  index[component] = true;
  writeIndex();
}

module.exports = transformHTML;