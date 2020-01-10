import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import '../../pwc-textinput/pwc-textinput.js';
import '../pwc-shadow.js';

const createProps = () => ({
  additionalClasses: text('Additional classes', ''),
});

storiesOf('Shadow', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { variant, disabled, onClick, additionalClasses } = createProps();
    return html`
      <section class="pf-c-page__main-section" style="padding: 20px">
        <h1 class="pf-c-title pf-m-3xl">Multiple elements in single shadow dom (a11y test)</h1>
        <br />
        <pwc-shadow>
          <div class="pf-c-form-group">
            <label class="pf-c-form-label" for="firstName">
              <span>First Name</span>
            </label>
            <pwc-textinput class=${additionalClasses} id="firstName" />
          </div>
        </pwc-shadow>
      </section>
    `;
  });
