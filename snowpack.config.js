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
	],
};

module.exports = config;