<script lang="ts">
	import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { glows, state, getConfig } from '$src/data';
	import GlowContent from './glow-content.svelte';
	import NotFound from '$lib/not-found.svelte';
	import { page } from '$app/stores';
	import { base } from '$app/paths';
	
	$: ({ cvar } = $page.params);
	$: data = cvar == null ? null : getData(cvar);

	function getData(cvar: string)
	{
		const metadata = glows.find(g => g.cvar == cvar);
		if (metadata == null)
			return null;
		
		const config = getConfig($state.config, cvar);
		
		return { metadata, config };
	}
</script>

<Breadcrumb noTrailingSlash>
	<BreadcrumbItem href="{base}/">Glows</BreadcrumbItem>
	{#if data}
		<BreadcrumbItem>{data.metadata.label}</BreadcrumbItem>
	{/if}
</Breadcrumb>

{#if data}
	<GlowContent {...data}/>
{:else}
	<NotFound/>
{/if}
