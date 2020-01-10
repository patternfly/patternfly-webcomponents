import { html } from 'lit-html';
import { storiesOf } from '@storybook/polymer';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select, text } from '@storybook/addon-knobs';

import '../pwc-dropdown.js';

const createProps = () => ({
  additionalClasses: text('Additional classes', ''),
});

storiesOf('Dropdown', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { variant, disabled, onClick, additionalClasses } = createProps();
    return html`
      <section class="pf-c-page__main-section" style="padding: 20px">
        <h1 class="pf-c-title pf-m-3xl">Dropdown</h1>
        <br />
        <pwc-dropdown>
          <span>TBD...</span>
        </pwc-dropdown>
      </section>
    `;
  });
