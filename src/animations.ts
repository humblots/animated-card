import { gsap } from "gsap";
import { TweenMax, Bounce } from "gsap/all";

gsap.registerPlugin(TweenMax, Bounce);

interface Animations {
  [key: string]: (target: HTMLElement) => gsap.core.Tween[];
}

function rotate (target: HTMLElement) {
  return [
    gsap.to(target, {duration: 2, rotation: 360}),
    gsap.to(target, {duration: 0, rotation: 0, delay: 2})
  ]
}

function flip (target: HTMLElement) {
  return [
    gsap.to(target, {rotationY: 360, duration: 2}),
    gsap.to(target, {rotationY: 0, duration: 0, delay: 2})
  ]
}

function bounce (target: HTMLElement) {
  return [
    gsap.to(target, {duration: 0.4, scale: 1.5, ease: "bounce.easeOut"}),
    gsap.to(target, {duration: 0.2, scale: 1, delay: 0.4})
  ]
}

const animations : Animations = {
  rotate,
  bounce,
  flip
}

export default animations;