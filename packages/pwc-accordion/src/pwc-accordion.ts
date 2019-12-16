import { html, LitElement, customElement } from 'lit-element';
import styles from './pwc-accordion.css';

@customElement('pwc-accordion')
export class PWCAccordion extends LitElement {
  static get styles() {
    return styles;
  }

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  protected render() {
    return html`
      <div>
        <slot></slot>
      </div>`;
  }
}
