<script lang="ts">
	import { Slider } from 'carbon-components-svelte';
	import { state } from '$src/data';

	export let value: number;
</script>

<Slider labelText="Color Transitions Per Second" {...$$props}
	min={0.01} max={10} step={0.01}
	minLabel=" " maxLabel=" "
	on:change={state.save} 
	bind:value/>
