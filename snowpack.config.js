const fs = require('fs');
const path = require('path');

const package = JSON.parse(fs.readFileSync('./package.json'));

/** @type {import('snowpack').SnowpackPlugin} */
const constants = {
	transform: options => options.contents
		.replace(/GITHUB_URL/g, JSON.stringify(package.repository.url)),
};

/** @type {import('snowpack').SnowpackPlugin} */
const fixCssBundlePath = {
	optimize(options)
	{
		const indexPath = path.join(options.buildDirectory, 'index.html');
		const index = fs.readFileSync(indexPath, { encoding: 'utf8' });
		
		fs.writeFileSync(indexPath, index.replace(/\/main\.(.*)\.css/, './main.$1.css'));
	}
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
		'snowpack-plugin-hash',
		["@brunnerh/snowpack-plugin-delegate", constants],
		["@brunnerh/snowpack-plugin-delegate", fixCssBundlePath],
	],
	optimize: {
		bundle: true,
		minify: true,
		target: 'es2018',
	},
};

module.exports = config;