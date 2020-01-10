import classnames from 'classnames';
import {html, LitElement, customElement, property} from 'lit-element';
import styles from './pwc-accordion.css';

@customElement('pwc-accordion')
export class PWCAccordion extends LitElement {
  protected defaultClass = 'pf-c-accordion';

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
      <div>
        <slot></slot>
      </div>`;
  }
}
