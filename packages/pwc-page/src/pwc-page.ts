import { html, LitElement, customElement } from 'lit-element';
import styles from './pwc-page.css';

@customElement('pwc-page')
export class PWCPage extends LitElement {
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
