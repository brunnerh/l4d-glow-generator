<script type="text/typescript">
	import Router from 'svelte-spa-router';
	import {
		Column,
		Content,
		Grid,
		Header,
		HeaderActionLink,
		HeaderUtilities,
		Row,
		SkipToContent,
	} from 'carbon-components-svelte';
	import LogoGithub20 from 'carbon-icons-svelte/lib/LogoGithub20';
	import Home from './components/home.svelte';
	import NotFound from './components/not-found.svelte';
	import Glow from './components/glow.svelte';

	export let githubUrl: string | null = null;

	const routes = {
		'/': Home,
		'/glow/:cvar': Glow,
		'*': NotFound,
	};
</script>

<style>
	.home-link
	{
		height: 100%;
		display: flex;
		align-items: center;
		text-decoration: none;
		color: inherit;
	}

	h1
	{
		font-size: 1.25rem;
	}
</style>

<Header>
	<div slot="skip-to-content">
		<SkipToContent />
	</div>
	<div slot="platform">
		<a class="home-link" href="/#/">
			<h1>L4D Glow Generator</h1>
		</a>
	</div>

	<HeaderUtilities>
		{#if githubUrl}
			<HeaderActionLink href={githubUrl} icon={LogoGithub20}/>
		{/if}
	</HeaderUtilities>
</Header>

<Content>
	<Grid>
		<Row>
			<Column>
				<Router {routes}/>
			</Column>
		</Row>
	</Grid>
</Content>