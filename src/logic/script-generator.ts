import type { State } from '../data';
import { glows } from '../data';
import tinygradient from 'tinygradient';

export function generateScripts(state: State)
{
	const files: GlowFile[] = [];

	for (let cvar in state.config)
	{
		const metadata = glows.find(g => g.cvar == cvar);
		const config = state.config[cvar];

		if (config == null || config.colors.length == 0 || metadata == null)
			continue;

		const { alias } = metadata;
		const colorStops = config.colors;
		const framesPerTransition = config.framesPerTransition.enabled ?
			config.framesPerTransition.value :
			state.framesPerTransition;

		const lines: string[] = [];

		if (colorStops.length == 1)
		{
			const color = tinygradient([colorStops[0], colorStops[0]]).rgbAt(0).toRgb();
			const script =
				`cl_glow_${cvar}_r ${float(color.r)}; cl_glow_${cvar}_g ${float(color.g)}; cl_glow_${cvar}_b ${float(color.b)}`;

			files.push(new GlowFile(alias, script));
			continue;
		}

		const gradient = tinygradient(colorStops).loop();
		const steps = colorStops.length * framesPerTransition;
		
		const colors: Color[] = [];
		for (let i = 0; i < steps; i++)
		{
			const pos = i / steps;
			colors.push(gradient.rgbAt(pos).toRgb());
		}

		colors.forEach((color, i) =>
			lines.push(
				`alias ${alias}${i} "cl_glow_${cvar}_r ${float(color.r)}; cl_glow_${cvar}_g ${float(color.g)}; cl_glow_${cvar}_b ${float(color.b)}"`
			)
		);

		for (let i = 0; i < colors.length; i++)
		{
			if (i == colors.length - 1)
			{
				lines.push(`alias ${alias}Part${i} "${alias}${i}; wait 1; ${alias}Part0"`);
				break;
			}

			lines.push(`alias ${alias}Part${i} "${alias}${i}; wait 1; ${alias}Part${i + 1}"`);
		}

		lines.push(alias + "Part0");
		lines.push('');

		files.push(new GlowFile(alias, lines.join('\n')));
	}

	return files;
}

/**
 * Convert channel byte value to three fractional digits float.
 * @param number 
 */
function float(number: number)
{
	return Math.round((number / 255) * 1000) / 1000;
}

class GlowFile
{
	get filename() { return this.alias + '.cfg' }

	constructor(
		public alias: string,
		public contents: string,
	)
	{

	}
}

interface Color
{
	r: number;
	g: number;
	b: number;
}