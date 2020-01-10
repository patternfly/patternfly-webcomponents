import classnames from 'classnames';
import { html, LitElement, property, customElement } from 'lit-element';
import styles from './pwc-dropdown.css';

@customElement('pwc-dropdown')
export class PwcDropdown extends LitElement {
  protected defaultClass = 'pf-c-dropdown';

  /**
   * Additional button classes
   */
  @property({ type: String, reflect: true })
  class = this.defaultClass;

  public attributeChangedCallback(name, oldval, newval) {
    if (name === 'class') {
      this.class = classnames(this.defaultClass, newval);
      super.attributeChangedCallback(name, oldval, this.class);
    }
  }

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static get styles() {
    return styles;
  }

  protected render() {
    return html`
      <slot></slot>
    `;
  }
}
