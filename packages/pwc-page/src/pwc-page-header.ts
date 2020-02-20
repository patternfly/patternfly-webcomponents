import { html, property, customElement, LitElement } from 'lit-element';
import styles from './pwc-page.css';

/**
 * Page header
 */
@customElement('pwc-page-header')
export class PWCPageHeader extends LitElement {
  protected defaultClass = 'pf-c-page__header';

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
      <header role="banner" class="${this.defaultClass}"><slot></slot></header>
    `;
  }
}
