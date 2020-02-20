import { configure, addDecorator, addParameters } from '@storybook/angular';
import theme from './theme';
import '../../docs/variables.css';

addParameters({
  options: {
    theme: theme,
  },
});

addDecorator(story => {
  const { template, ...rest } = story();
  // Makes the style global instead of letting Angular scope it
  const cssText = "";
  let containerStyleNode = document.getElementById('container-style');
  if (!containerStyleNode) {
    containerStyleNode = document.createElement('style');
    containerStyleNode.setAttribute('type', 'text/css');
    containerStyleNode.appendChild(document.createTextNode(cssText));
    document.head.appendChild(containerStyleNode);
  }
  else {
    containerStyleNode.textContent = cssText;
  }
  return {
    ...rest,
    template: `
    <div class="pf-m-redhat-font">
      <main name="main-content" role="main" class="pf-c-page__main">
        ${template}
      </main>
    </div>
    `,
  };
});

function loadStories() {
  const req = require.context('../../packages', true, /\-story\-angular\.[jt]s$/);
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);
