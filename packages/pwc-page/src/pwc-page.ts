import classnames from 'classnames';
import { html, property, customElement, LitElement } from 'lit-element';
import styles from './pwc-page.css';

/**
 * Page
 */
@customElement('pwc-page')
export class PWCPage extends LitElement {
  protected defaultClass = 'pf-c-page';

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
    // const { class: additionalClass } = this;
    // const classes = classnames(additionalClass, 'pf-c-page');
    // return html`
    //   <div class="${classes}"><slot></slot></div>
    // `;
    return html`
      <slot></slot>
    `;
  }
}
