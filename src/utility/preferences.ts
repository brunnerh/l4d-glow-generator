import { writable } from 'svelte/store';

export const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion)').matches;

export const animatedColors = writable<boolean>(prefersReducedMotion == false);