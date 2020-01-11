import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { storiesOf } from '@storybook/angular';
import { action } from '@storybook/addon-actions';
import { withKnobs, boolean, select } from '@storybook/addon-knobs/angular';

import { BUTTON_VARIANT } from '../pwc-button.js';

const variant = {
  [`Primary button (${BUTTON_VARIANT.PRIMARY})`]: BUTTON_VARIANT.PRIMARY,
  [`Secondary button (${BUTTON_VARIANT.SECONDARY})`]: BUTTON_VARIANT.SECONDARY,
  [`Danger button (${BUTTON_VARIANT.DANGER})`]: BUTTON_VARIANT.DANGER,
};

const createProps = () => ({
  variant: select('Button variant', variant, BUTTON_VARIANT.PRIMARY),
  disabled: boolean('Disabled', false),
  onClick: action('onClick'),
});

storiesOf('Angular Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => ({
    template: `
      <pwc-button [variant]="variant" [disabled]="disabled" (click)="onClick($event)">Button</pwc-button>
    `,
    props: createProps(),
    moduleMetadata: {
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    },
  }));
