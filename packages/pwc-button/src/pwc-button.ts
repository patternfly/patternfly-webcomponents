import classnames from 'classnames';
import { html, LitElement, property, customElement } from 'lit-element';
import styles from './pwc-button.css';

/**
 * Button kinds.
 */
export enum BUTTON_VARIANT {
  /**
   * Primary button.
   */
  PRIMARY = 'primary',

  /**
   * Secondary button.
   */
  SECONDARY = 'secondary',

  /**
   * Tertiary button.
   */
  TERTIARY = 'tertiary',

  /**
   * Danger button.
   */
  DANGER = 'danger',

  /**
   * Link button.
   */
  LINK = 'link',

  /**
   * Link button.
   */
  PLAIN = 'plain',

  /**
   * Link button.
   */
  INLINE = 'inline',
}

@customElement('pwc-button')
export class PWCButton extends LitElement {
  /**
   * `true` if the button should be disabled. Corresponds to the attribute with the same name.
   */
  @property({ type: Boolean, reflect: true })
  disabled = false;

  /**
   * Button variant
   */
  @property({ reflect: false })
  variant = BUTTON_VARIANT.PRIMARY;

  /**
   * Additional button classes
   */
  @property({ reflect: false })
  class = '';

  static get styles() {
    return styles;
  }

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  protected render() {
    const { disabled, variant, class: additionalClass } = this;
    const classes = classnames(`pf-c-button`, {
      [`pf-m-${variant}`]: variant
    }, additionalClass);
    return html`
      <button id="button" class="${classes}" ?disabled=${disabled}><slot></slot></button>
    `;
  }
}
