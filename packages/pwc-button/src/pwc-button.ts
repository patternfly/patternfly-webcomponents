import { html, LitElement, property, customElement } from 'lit-element';
import styles from './pwc-button.css';

@customElement('pwc-button')
export class PWCButton extends LitElement {
  @property() variant = 'primary';
  @property() label = 'label';

  static get styles() {
    return styles;
  }

  protected createRenderRoot() {
    return this.attachShadow({ mode: 'open' });
  }

  protected render() {
    return html`
      <button class="pf-c-button pf-m-${this.variant}">
        ${this.label}
      </button>`;
  }
}
