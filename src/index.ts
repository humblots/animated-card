import {html, LitElement, TemplateResult} from "lit";
import {customElement} from 'lit/decorators.js';

@customElement('animated-card')
export class AnimatedCard extends LitElement {
  protected render(): TemplateResult {
    return html`
      <div class="card">
        <slot></slot>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "animated-card": AnimatedCard;
  }
}