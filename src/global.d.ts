/// <reference types="@sveltejs/kit" />

declare module '*.svelte' {
	export { SvelteComponent } from 'svelte';
	export default SvelteComponent;
}
