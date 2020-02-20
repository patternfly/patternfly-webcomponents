import { html, LitElement, property, customElement } from 'lit-element';
import styles from './pwc-textinput.css';

@customElement('pwc-textinput')
export class PwcTextinput extends LitElement {
  protected defaultClass = 'pf-c-form-control';

  /**
   * Additional button classes
   */
  @property({ reflect: false })
  class = '';

  /**
   * ID
   */
  @property({ reflect: false })
  id = '';

  /**
   * `true` if the button should be in shadow dom (default) TBD...
   */
  @property({ reflect: false })
  shadow = true;

  public attributeChangedCallback(name, oldval, newval) {
    if (name === 'class') {
      this.class = [this.defaultClass, newval].filter(Boolean).join(' ');
      super.attributeChangedCallback(name, oldval, this.class);
    }
  }

  protected createRenderRoot() {
    return this.shadow !== false ? this.attachShadow({ mode: 'open', delegatesFocus: true }) : this;
  }

  static get styles() {
    return styles;
  }

  protected render() {
    const { class: additionalClass, id } = this;
    const classes = [this.defaultClass, additionalClass].filter(Boolean).join(' ');
    return html`
      <input class="${classes}" id="${id}" type="text" />
    `;
  }
}
