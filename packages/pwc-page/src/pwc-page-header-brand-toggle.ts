import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './pwc-page.css';

/**
 * Page Header Brand.
 */
@customElement('pwc-page-header-brand-toggle')
export class PWCPageHeaderBrandToggle extends LitElement {
  /**
   * Additional button classes
   */
  @property({ reflect: false })
  class = '';

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open', delegatesFocus: true });
  }

  static get styles() {
    return styles;
  }

  protected render() {
    const { class: additionalClass } = this;
    const classes = classnames(additionalClass, 'pf-c-page__header-brand-toggle');
    return html`
      <div class="${classes}"><slot></slot></div>
    `;
  }
}
