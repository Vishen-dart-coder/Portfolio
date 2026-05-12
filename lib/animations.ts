import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Fade in from bottom animation
 */
export function fadeInUp(
  element: HTMLElement | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
}

/**
 * Fade in with scale animation
 */
export function fadeInScale(
  element: HTMLElement | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    scale: 0.9,
    duration: 1,
    ease: 'power3.out',
    ...options,
  });
}

/**
 * Stagger animation for lists
 */
export function staggerFadeIn(
  elements: HTMLElement[] | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(elements, {
    opacity: 0,
    y: 40,
    duration: 0.8,
    ease: 'power3.out',
    stagger: 0.1,
    ...options,
  });
}

/**
 * Parallax effect
 */
export function parallax(
  element: HTMLElement | string,
  speed: number = 0.5,
  options: ScrollTrigger.Vars = {}
) {
  return gsap.to(element, {
    y: (i, target) => {
      return -ScrollTrigger.maxScroll(window) * speed;
    },
    ease: 'none',
    scrollTrigger: {
      start: 'top top',
      end: 'max',
      invalidateOnRefresh: true,
      scrub: 0,
      ...options,
    },
  });
}

/**
 * Reveal on scroll
 */
export function revealOnScroll(
  element: HTMLElement | string,
  options: gsap.TweenVars = {}
) {
  return gsap.from(element, {
    opacity: 0,
    y: 60,
    duration: 1,
    ease: 'power3.out',
    ...options,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      end: 'top 20%',
      toggleActions: 'play none none none',
    },
  });
}
