import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './pwc-page.css';

/**
 * Page header brand toggle
 */
@customElement('pwc-page-header-brand-toggle')
export class PWCPageHeaderBrandToggle extends LitElement {
  protected defaultClass = 'pf-c-page__header-brand-link';

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
