const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');

const rootPath = path.join(__dirname, '..');
const templatePath = path.join(__dirname, 'template')
const componentName = process.argv[2];

if (!componentName) {
  console.error('Must specify component name');
  process.exit(2);
}

const capitalize = str => `${str[0].toUpperCase()}${str.substr(1)}`;
const toReplace = [
  [/{name}/g, componentName],
  [/{nameCapitalized}/g, capitalize(componentName)],
];
const templateReplace = str => {
  let res = str;
  toReplace.forEach(([regex, string]) => res = res.replace(regex, string));

  return res
}

// Write out templated files
glob.sync(`${templatePath}/**/*.*`).forEach(file => {
  const toPath = templateReplace(
    path.join(rootPath, file.replace(templatePath, ''))
  );
  const contents = templateReplace(fs.readFileSync(file, 'utf8'));
  fs.ensureFileSync(toPath);
  fs.writeFileSync(toPath, contents);
});
