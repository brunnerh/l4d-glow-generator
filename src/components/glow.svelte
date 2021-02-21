<script type="text/typescript">
	import { Breadcrumb, BreadcrumbItem, Toggle, NumberInput } from 'carbon-components-svelte';
	import { glows, state, getConfig } from '../data';
	import ColorTable from './color-table.svelte';
	import NotFound from './not-found.svelte';

	export let params: { cvar: string } | null = null;
	
	$: data = params?.cvar == null ?
		null :
		getData(params.cvar);

	function getData(cvar: string)
	{
		const metadata = glows.find(g => g.cvar == params!.cvar);
		if (metadata == null)
			return null;
		
		const config = getConfig($state.config, cvar);
		
		return { metadata, config };
	}
</script>

<Breadcrumb noTrailingSlash>
	<BreadcrumbItem href="/#/">Glows</BreadcrumbItem>
	{#if data}
		<BreadcrumbItem>{data.metadata.label}</BreadcrumbItem>
	{/if}
</Breadcrumb>

{#if data}
	<h2 class="mt32">{data.metadata.label}</h2>

	<div class="mt16">{data.metadata.description}</div>

	<div class="mt16 flex">
		<Toggle labelText="Custom transition speed"
			style="flex: 0 0 auto"
			on:toggle={state.save}
			bind:toggled={data.config.framesPerTransition.enabled}/>

		{#if data.config.framesPerTransition.enabled}
			<NumberInput label="Frames per transition"
				class="ml32" style="flex: 0 0 auto"
				on:change={state.save}
				bind:value={data.config.framesPerTransition.value}/>
		{/if}
	</div>

	<ColorTable config={data.config}/>
{:else}
	<NotFound/>
{/if}