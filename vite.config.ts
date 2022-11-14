import { extractFonts } from './src/plugins/extract-fonts';
import { sveltekit } from '@sveltejs/kit/vite';
import { resolve } from 'path';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import pkg from './package.json';

export default defineConfig(config =>
{
	const { command } = config;
	
	return {
		define: {
			GITHUB_URL: JSON.stringify(pkg.repository.url),
		},
		server: {
			fs: {
				allow: [
					searchForWorkspaceRoot(process.cwd()),
					'./fonts',
				],
			},
		},
		resolve: {
			alias: {
				'$src': resolve('src/'),
			},
		},
		plugins: [
			sveltekit(),
			extractFonts({
				command,
				cacheDir: '.fonts',
				assetDir: '_app/immutable/assets',
			}),
		],
	}
});
