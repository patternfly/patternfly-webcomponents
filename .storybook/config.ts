// import '../src/polyfills';
import { html } from 'lit-html'; // eslint-disable-line import/first
import { configure, addDecorator, addParameters } from '@storybook/polymer'; // eslint-disable-line import/first
import theme from './theme';
import containerStyles from './_container.scss'; // eslint-disable-line import/first

addParameters({
  options: {
    theme: theme,
  },
});

addDecorator(story => {
  const result = story();
  return html`
    <div class="pf-m-redhat-font">
      <style>
        ${containerStyles}
      </style>
      <main name="main-content" role="main" class="pf-c-page__main">
        ${result}
      </main>
    </div>
  `;
});

function loadStories() {
  const req = require.context('../packages', true, /\.story\.[jt]s$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
