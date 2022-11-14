<script lang="ts">
	import 'carbon-components-svelte/css/all.css'
	import '../styles/layout.less';
	import '../styles/theme.less';
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
	import { LogoGithub } from 'carbon-icons-svelte';
	import { onMount } from 'svelte';
	import { animatedColors } from '../utility/preferences';

	let mounted = false;

	onMount(() =>
	{
		$animatedColors = window.matchMedia('(prefers-reduced-motion)').matches == false;
		mounted = true;
	})
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
		<a class="home-link" href="/">
			<h1>L4D Glow Generator</h1>
		</a>
	</div>

	<HeaderUtilities>
		<!-- svelte-ignore missing-declaration -->
		<HeaderActionLink href={GITHUB_URL} icon={LogoGithub}
			target="_blank" rel="noopener noreferrer" />
	</HeaderUtilities>
</Header>

<Content>
	<Grid>
		<Row>
			<Column>
				{#if mounted}
					<slot />
				{/if}
			</Column>
		</Row>
	</Grid>
</Content>
