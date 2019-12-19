import { html, LitElement, customElement } from 'lit-element';
import styles from './pwc-{name}.css';

@customElement('pwc-{name}')
export class PWC{nameCapitalized} extends LitElement {
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
