import { html, LitElement, property, customElement } from 'lit-element';
import { classnames } from '@patternfly/pwc-base/dist/utils';
import styles from './pwc-button.css';

export enum BUTTON_VARIANT {
  /* Primary button. */
  PRIMARY = 'primary',
  /* Secondary button. */
  SECONDARY = 'secondary',
  /* Tertiary button. */
  TERTIARY = 'tertiary',
  /* Danger button. */
  DANGER = 'danger',
  /* Link button. */
  LINK = 'link',
  /* Plain button. */
  PLAIN = 'plain',
  /* Inline button. */
  INLINE = 'inline',
}

@customElement('pwc-button')
export class PWCButton extends LitElement {
  /**
   * `true` if the button should be disabled. Corresponds to the attribute with the same name.
   */
  @property({
    type: Boolean,
    reflect: true,
  })
  disabled;

  /* Button variant */
  @property({ reflect: false })
  variant = BUTTON_VARIANT.PRIMARY;

  /* Additional button classes */
  @property({ reflect: false })
  class = '';

  /* handle onClick event */
  @property({ type: Function })
  click;

  static get styles() {
    return styles;
  }

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  protected render() {
    const { click, disabled, class: additionalClass, variant } = this;
    return html`
      <button class="${classnames('pf-c-button', variant && `pf-m-${variant}`, additionalClass)}" 
              ?disabled=${disabled} 
              @click=${click}>
        <slot></slot>
      </button>
    `;
  }
}
