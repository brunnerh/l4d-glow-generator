const fs = require('fs');

const package = JSON.parse(fs.readFileSync('./package.json'));

/** @type {import('snowpack').SnowpackPlugin} */
const constantsPlugin = {
	transform: options => options.contents
		.replace(/GITHUB_URL/g, JSON.stringify(package.repository.url)),
};

/** @type {import('snowpack').SnowpackConfig} */
const config = {
	mount: {
		src: '/',
	},
	buildOptions: {
		out: 'out',
	},
	plugins: [
		'@snowpack/plugin-svelte',
		'snowpack-plugin-less',
		["@brunnerh/snowpack-plugin-delegate", constantsPlugin],
	],
	optimize: {
		bundle: true,
		minify: true,
		target: 'es2018',
	},
};

module.exports = config;