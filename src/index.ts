import { LitElement} from "lit";
import {customElement, property} from 'lit/decorators.js';
import animations from "./animations";


function addListener(target: HTMLElement, on: string , execute: (e: Event) => void): void {
    target.addEventListener(on, (e) => execute(e));
}

function createCard(on: string, execute: (e: Event ) => void): HTMLDivElement {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  cardDiv.innerHTML = '<slot></slot>'
  addListener(cardDiv, on, execute)
  return cardDiv;
}

@customElement('animated-card')
export class AnimatedCard extends LitElement {
  @property({type: String})
  on?: string;

  @property({type: String})
  animation?: string;

  cardDiv : HTMLDivElement= document.createElement('div');

  protected render(): HTMLDivElement|string {
    if (this.on === undefined || this.animation === undefined) {
      console.error('You have to define a trigger and an animation to use animated cards')
      return '';
    }

    return createCard(this.on, animations[this.animation])
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "animated-card": AnimatedCard;
  }
}