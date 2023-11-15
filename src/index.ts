import {css, LitElement} from "lit";
import {customElement, property} from 'lit/decorators.js';
import animations from "./animations";

function getDomTarget(targetName: string): Element|Window|Document|undefined|null {
  let target;
  if (targetName === 'document') {
      target = document;
    } else if (targetName === 'window') {
    target = window;
    } else {
    target = document.querySelector(targetName);
    }
  return target;
}

function addListener(
  target: HTMLElement,
  animationsToTrigger: string,
  refs: {[key: string]: gsap.core.Tween[]},
  isRunning: {[key:string]: boolean}
): void {

  animationsToTrigger.split(',').forEach((animationToTrigger: string) => {
    const [animation, on, domTargetName] = animationToTrigger.trim().split(':')
    if (on === undefined || animation === undefined) {
      console.error("Your animation definition is wrong. It should be like 'rotate:scroll:document' or 'click:flip', ...")
      return
    }

    if (animations[animation] === undefined) {
      console.error(`The animation ${animation} is not defined. Please check your spelling.`)
      return;
    }

    let domTarget;
    if (domTargetName !== undefined) {
      domTarget = getDomTarget(domTargetName);
      if (!domTarget) {
        console.error(`The target "${domTargetName}" is not defined. Please check your spelling.`)
        return;
      }
    }

    (domTarget ? domTarget : target).addEventListener(on, () => {
      isRunning[animationToTrigger] = refs[animationToTrigger] ?
        refs[animationToTrigger].some((gsapAnimation: gsap.core.Tween) => gsapAnimation.isActive())
        : false;
      if (isRunning[animationToTrigger]) return
      refs[animationToTrigger] = animations[animation](target);
    });
  });
}

function createCard(
  animationsToTrigger: string,
  refs: gsap.core.Tween[],
  isRunning: {[key:string]: boolean}
): HTMLDivElement {
  const cardDiv = document.createElement('div');
  cardDiv.classList.add('card');
  cardDiv.innerHTML = '<slot></slot>';
  addListener(cardDiv, animationsToTrigger, refs, isRunning);
  return cardDiv;
}

@customElement('animated-card')
export class AnimatedCard extends LitElement {
  @property({type: String})
  animations: string = '';

  animationsRef: {[key: string]: gsap.core.Tween[]} = {};
  isRunning: {[key:string]: boolean} = {};

  static styles =  [
    css`
    .card {
      width: fit-content;
      padding: 10px;
      border: solid 1px grey;
      border-radius: 10px;
    }`]

  protected render(): HTMLDivElement|string {
    if (this.animations === undefined) {
      console.error('You have to define an animation to use animated cards')
      return '';
    }
    console.log(this.animations)
    return createCard(this.animations, this.animationsRef, this.isRunning)
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "animated-card": AnimatedCard;
  }
}

export default AnimatedCard;