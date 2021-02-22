<script type="text/typescript">
	import { state } from '../data';

	export let cvar: string;

	$: colors = $state.config[cvar]?.colors ?? [];
	$: gradient = `linear-gradient(to right, ${[...colors, colors[0]].join(', ')}`;
</script>

<style>
	.preview
	{
		width: 100%;
		height: 100%;
	}
</style>

{#if colors.length > 0}
	<div class="preview" style="background: {gradient}" title="{colors.length} Color/s">&nbsp;</div>
{/if}