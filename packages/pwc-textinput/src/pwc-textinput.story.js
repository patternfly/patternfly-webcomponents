import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import '../pwc-textinput.js';

const createProps = () => ({
  additionalClasses: text('Additional classes', ''),
});

storiesOf('Text input', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { variant, disabled, onClick, additionalClasses } = createProps();
    return html`
      <section class="pf-c-page__main-section" style="padding: 20px">
        <h1 class="pf-c-title pf-m-3xl">A11y VoiceOver test</h1>
        <br />
        <div class="pf-c-form-group">
          <label class="pf-c-form-label" for="firstName">
            <span>First Name</span>
          </label>
          <pwc-textinput class=${additionalClasses} id="firstName" />
        </div>
        <br />
        <h1 class="pf-c-title pf-m-3xl">A11y HTML test</h1>
        <br/>
        <div class="pf-c-form-group">
          <label class="pf-c-form-label" for="lastName">
            <span>Last Name</span>
          </label>
          <input class="pf-c-form-control" id="lastName" type="text" />
        </div>
      </section>
    `;
  });
