import { html, LitElement, property, customElement } from 'lit-element';
import styles from './pwc-shadow.css';

@customElement('pwc-shadow')
export class PwcShadow extends LitElement {
  protected defaultClass = '';

  /**
   * Additional button classes
   */
  @property({ type: String, reflect: true })
  class = this.defaultClass;

  public attributeChangedCallback(name, oldval, newval) {
    if (name === 'class') {
      this.class = [this.defaultClass, newval].filter(Boolean).join(' ');
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
