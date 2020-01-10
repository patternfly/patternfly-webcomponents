// import '../../src/polyfills';
import React, { StrictMode } from 'react';
import { configure, addDecorator, addParameters } from '@storybook/react'; // eslint-disable-line import/first
import theme from './theme';
import containerStyles from '../_container.scss'; // eslint-disable-line import/first

addParameters({
  options: {
    theme: theme,
  },
});

addDecorator(story => (
  <StrictMode>
    <div className="pf-m-redhat-font">
      <main role="main" className="pf-c-page__main">
        {story()}
      </main>
    </div>
  </StrictMode>
));

function loadStories() {
    const req = require.context('../../packages', true, /\-story\-react\.[jt]sx$/);
    req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
