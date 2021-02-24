<script type="text/typescript">
	import { Toggle, Tile } from 'carbon-components-svelte';
	import { state } from '../data';
	import type { GlowConfig, GlowMetadata } from '../data';
	import { animatedColors } from '../utility/preferences';
	import ColorTable from './color-table.svelte';
	import ColorsPreview from './colors-preview.svelte';
	import PlayPauseButton from './utility/play-pause-button.svelte';
	import TransitionsInput from './utility/transitions-input.svelte';

	export let metadata: GlowMetadata;
	export let config: GlowConfig;
</script>

<h2 class="mt32">{metadata.label}</h2>

<div class="mt16">{metadata.description}</div>

<div class="mt16 flex">
	<Toggle labelText="Custom transition speed"
		style="flex: 0 0 auto"
		on:toggle={state.save}
		bind:toggled={config.transitionsPerSecond.enabled}/>

	{#if config.transitionsPerSecond.enabled}
		<TransitionsInput
			class="ml32" style="flex: 0 0 auto"
			bind:value={config.transitionsPerSecond.value}/>
	{/if}
</div>

<ColorTable bind:colors={config.colors}/>

{#if config.colors.length > 0}
	<Tile class="mt8">
		<h4>Preview</h4>

		<div class="flex items-center" style="max-width: 400px">
			<PlayPauseButton/>

			<div class="flex-star ml16">
				<ColorsPreview
					colors={config.colors}
					transitionsPerSecond={
						config.transitionsPerSecond.enabled ?
							config.transitionsPerSecond.value :
							$state.transitionsPerSecond
					}
					animate={$animatedColors}/>
			</div>
		</div>
	</Tile>
{/if}