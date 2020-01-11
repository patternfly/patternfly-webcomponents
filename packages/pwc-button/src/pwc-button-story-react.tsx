import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { withKnobs, select, boolean, text } from '@storybook/addon-knobs';
import createReactCustomElementType, { booleanSerializer } from '../../pwc-utils/createReactCustomElementType';

import { BUTTON_VARIANT } from '../pwc-button.js';

const PwcButton = createReactCustomElementType('pwc-button', {
  disabled: {
    serialize: booleanSerializer,
  },
  small: {
    serialize: booleanSerializer,
  },
});

const variant = {
  [`Primary button (${BUTTON_VARIANT.PRIMARY})`]: BUTTON_VARIANT.PRIMARY,
  [`Secondary button (${BUTTON_VARIANT.SECONDARY})`]: BUTTON_VARIANT.SECONDARY,
  [`Danger button (${BUTTON_VARIANT.DANGER})`]: BUTTON_VARIANT.DANGER,
};

const createProps = () => ({
  variant: select('Button variant', variant, BUTTON_VARIANT.PRIMARY),
  disabled: boolean('Disabled', false),
  onClick: action('click'),
});

storiesOf('React Button', module)
  .addDecorator(withKnobs)
  .add('Default', () => {
    const { variant, disabled, onClick } = createProps();
    return (
      <PwcButton variant={variant} disabled={disabled} onClick={onClick}>
        Button
      </PwcButton>
    );
  });
