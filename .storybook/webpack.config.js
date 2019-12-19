module.exports = ({ config }) => {
  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: [
            new RegExp(`node_modules(\\/|\\\\)lit-html(.*)\\.js$`),
            new RegExp(`node_modules(\\/|\\\\)lit-element(.*)\\.js$`),
            new RegExp(`node_modules(\\/|\\\\)@patternfly(.*)\\.js$`),
          ],
          use: {
            loader: 'babel-loader',
            options: {
              plugins: [
                '@babel/plugin-syntax-dynamic-import',
                '@babel/plugin-syntax-import-meta',
                // webpack does not support import.meta.url yet, so we rewrite them in babel
                // ['bundled-import-meta', { importStyle: 'baseURI' }],
              ],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'entry',
                    corejs: 3,
                  },
                ],
              ],
              babelrc: false,
            },
          },
        },
      ],
    },
  };
}