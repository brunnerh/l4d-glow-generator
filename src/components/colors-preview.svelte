<script type="text/typescript">
	export let colors: string[];
	export let transitionsPerSecond: number;
	export let animate: boolean;

	let element: HTMLDivElement | null = null;
	let animation: Animation | null = null;

	$: colorsLooped = colors.length ? [...colors, colors[0]] : [];
	$: background = `linear-gradient(to right, ${colorsLooped.join(', ')}`

	$: if (element != null)
	{
		if (animation)
			animation.cancel();

		if (animate && colors.length)
		{
			animation = element.animate(
				colorsLooped.map(c => ({
					background: c,
				})),
				{
					duration: (1000 / transitionsPerSecond) * colors.length,
					iterations: Infinity,
				},
			);
		}
	}
</script>

<style>
	.preview
	{
		width: 100%;
		height: 100%;
	}
</style>

{#if colors.length > 0}
	<div bind:this={element} class="preview"
		style="background: {background};"
		title="{colors.length} Color/s">&nbsp;</div>
{/if}