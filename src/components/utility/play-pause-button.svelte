<script type="text/typescript">
	import { Button } from 'carbon-components-svelte';
	import { animatedColors } from '../../utility/preferences';
	import Play20 from 'carbon-icons-svelte/lib/Play20';
	import Pause20 from 'carbon-icons-svelte/lib/Pause20';
</script>

<Button kind="ghost"
	icon={$animatedColors ? Pause20 : Play20}
	iconDescription={$animatedColors ? 'Stop animation' : 'Start animation'}
	on:click={() => $animatedColors = !$animatedColors}/>