import sveltePreprocess from 'svelte-preprocess';
import adapter from '@sveltejs/adapter-static';
import { optimizeCarbonImports } from 'carbon-preprocess-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		sveltePreprocess(),
		optimizeCarbonImports(),
	],
	kit: {
		paths: {
			base: process.env.NODE_ENV == 'production' ? '/l4d-glow-generator' : '',
		},
		prerender: { entries: [] },
		adapter: adapter({
			pages: 'out',
			fallback: '404.html',
		}),
	},
};

export default config;
