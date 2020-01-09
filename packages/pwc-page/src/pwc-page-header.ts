// import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './pwc-page.css';

/**
 * Page Header.
 */
@customElement('pwc-page-header')
export class PWCPageHeader extends LitElement {
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
    // const { class: additionalClass } = this;
    // const classes = classnames(additionalClass, 'pf-c-page__header');
    const classes = 'pf-c-page__header';
    return html`
      <header role="banner" class="${classes}"><slot></slot></header>
    `;
  }
}
