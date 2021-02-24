<script type="text/typescript">
	import { Breadcrumb, BreadcrumbItem } from 'carbon-components-svelte';
	import { glows, state, getConfig } from '../data';
	import GlowContent from './glow-content.svelte';
	import NotFound from './not-found.svelte';

	export let params: { cvar: string } | null = null;
	
	$: cvar = params?.cvar ?? null;
	$: data = cvar == null ? null : getData(cvar);

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
	<BreadcrumbItem href="#/">Glows</BreadcrumbItem>
	{#if data}
		<BreadcrumbItem>{data.metadata.label}</BreadcrumbItem>
	{/if}
</Breadcrumb>

{#if data}
	<GlowContent {...data}/>
{:else}
	<NotFound/>
{/if}