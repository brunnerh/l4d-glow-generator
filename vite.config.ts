import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import pkg from './package.json';

export default defineConfig({
	define: {
		GITHUB_URL: JSON.stringify(pkg.repository.url),
	},
	resolve: {
		alias: {
			'$src': resolve('src/'),
		},
	},
	plugins: [
		sveltekit(),
	],
});
