import React from 'react';
import '../../demos/variables.css';
import '../../packages/pwc-button/pwc-button.js';

export default { title: 'Button' };

export const primaryVariant = () => <pwc-button label="Primary Button"></pwc-button>;

export const secondaryVariant = () => <pwc-button label="Secondary Button" variant="secondary"></pwc-button>;
