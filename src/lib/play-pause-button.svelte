<script lang="ts">
	import { Button } from 'carbon-components-svelte';
	import { animatedColors } from '$src/utility/preferences';
	import { Play, Pause } from 'carbon-icons-svelte';
</script>

<Button kind="ghost"
	icon={$animatedColors ? Pause : Play}
	iconDescription={$animatedColors ? 'Stop animation' : 'Start animation'}
	on:click={() => $animatedColors = !$animatedColors}/>
