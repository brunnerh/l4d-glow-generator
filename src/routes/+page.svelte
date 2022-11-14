<script lang="ts">
	import { Accordion, AccordionItem, Button, DataTable, NumberInput, Tile, Toolbar, ToolbarContent, ToolbarMenu, ToolbarMenuItem } from 'carbon-components-svelte';
	import { Upload, Download, ChevronRight, Menu, DocumentImport }from 'carbon-icons-svelte';
	import { defaultState, glows, state } from '$src/data';
	import type { State } from '$src/data';
	import { generateScripts } from '$src/logic/script-generator';
	import JSZip from 'jszip';
	import ColorsPreview from '$lib/colors-preview.svelte';
	import { sample } from '$src/data/sample-config';
	import cloneDeep from 'clone-deep';
	import { alert, confirm } from '$src/utility/dialogs';
	import { readFile } from '$src/utility/files';
	import { animatedColors } from '$src/utility/preferences';
	import TransitionsInput from '$lib/transitions-input.svelte';
	import PlayPauseButton from '$lib/play-pause-button.svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable.svelte';
	import exampleSrc from '$src/data/example-video.webm';
    import { gotoHref } from '$src/utility/links';
    import { goto } from '$app/navigation';
    import Flex from '$lib/flex.svelte';

	$: glowHeaders = [
		{ key: 'label', value: 'Glow Type' },
		innerWidth > 480 ? { key: 'description', value: 'Description' } : null,
		{ key: 'colors', value: 'Colors' },
		{ key: 'actions', empty: true },
	].filter(Boolean) as DataTableHeader[];

	const glowRows = glows.map(g => ({ ...g, id: g.cvar }));

	let showVideo = false;
	let innerWidth: number = Infinity;

	function getColors(cvar: string, state: State)
	{
		return cvar in state.config ?
			state.config[cvar].colors :
			[];
	}

	function getTransitionsPerSecond(cvar: string, defaultValue: number)
	{
		return $state.config[cvar]?.transitionsPerSecond.enabled ?
			$state.config[cvar]?.transitionsPerSecond.value :
			defaultValue;
	}

	function onEditGlow(cvar: string)
	{
		goto(`/glow/${cvar}`);
	}

	async function onLoadConfig()
	{
		const input = document.createElement('input');
		input.type = 'file';
		input.accept = '.zip,.json';
		input.addEventListener('change', loadFile);
		input.click();

		async function loadFile()
		{
			const file = (input.files ?? [])[0];
			if (file == null)
				return;

			if (file.name.match(/\.json/i))
			{
				const json = await readFile(file, 'string');
				tryLoadJson(json);
			}
			else if (file.name.match(/\.zip/i))
			{
				try
				{
					const data = await readFile(file, 'buffer');
					const zip = await JSZip.loadAsync(data);
					const configFile = zip.files['glows.json'];
					if (configFile == null)
					{
						alert('Error', 'Could not find "glows.json" in ZIP archive.');
						return;
					}
					const configJson = await configFile.async('string');
					tryLoadJson(configJson);
				}
				catch (error)
				{
					alert('Error', 'Could not read ZIP archive.');
				}
			}
			else
			{
				alert(
					'Error',
					'Cannot read this file format. ' +
					'Only a configuration JSON or the full generated ZIP ' +
					'are supported.'
				);
			}
		}

		function tryLoadJson(json: string)
		{
			try
			{
				$state = { ...$state, ...JSON.parse(json) };
			}
			catch 
			{
				alert('Error', 'Could not read configuration file contents.');
			}
		}
	}

	async function onGenerateScripts()
	{
		try
		{
			const files = generateScripts($state);
			if (files.length == 0)
			{
				await alert('Note', 'No files have been generated.');
				return;
			}

			const zip = new JSZip();
			zip.file('glows.json', JSON.stringify($state, null, 2));
			zip.file('autoexec.cfg', files.map(f => `exec ${f.filename}`).join('\n'));
			for (const file of files)
				zip.file(file.filename, file.contents);

			const file = await zip.generateAsync({ type: 'blob' });
			const url = URL.createObjectURL(file);

			const link = document.createElement('a');
			link.href = url;
			link.download = 'glow-scripts.zip';
			link.click();

			URL.revokeObjectURL(url);
		}
		catch (e)
		{
			console.error(e);

			await alert('Error', 'An error happened while generating a script.');
		}
	}

	async function onResetConfig()
	{
		if (await confirm('Resetting', 'Do you really want to reset the configuration?') == false)
			return;

		$state = defaultState();
	}

	async function onLoadExampleConfig()
	{
		const colorCount = Object.entries($state.config)
			.map(x => x[1].colors.length)
			.reduce((x, acc) => acc + x, 0);
		if (colorCount > 0 && await confirmLoad() == false)
			return;

		$state = { ...$state, ...cloneDeep(sample) };
	}

	const confirmLoad = () => confirm(
		'Loading Configuration',
		'Do you really want to load another configuration? ' +
		'The current configuration will be overwritten.'
	);
</script>

<svelte:window bind:innerWidth />

<Tile>
	<h4>About</h4>

	<p>This is an animated outline glow script generator for <em>Left 4 Dead</em> and <em>Left 4 Dead 2</em>.</p>

	<Accordion class="mt16" align="start">
		<AccordionItem title="Example" bind:open={showVideo}>
			<p>
				Demonstration of <code>Item</code> and <code>Item Far</code> glows.
			</p>

			{#if showVideo}
				<video src={exampleSrc} class="mt8"
					autoplay loop muted />
			{/if}

			<div class="mt8">
				<Button icon={DocumentImport}
					on:click={onLoadExampleConfig}>
					Load example config
				</Button>
			</div>
		</AccordionItem>

		<AccordionItem title="Installing the generated scripts">
			<p>
				The archive has to be extracted into the <code>cfg</code> directory of the respective game,
				the paths are the following:
			</p>

			<p>L4D: <code>[Steam]/steamapps/common/left 4 dead/left4dead/cfg</code></p>
			<p>L4D 2: <code>[Steam]/steamapps/common/Left 4 Dead 2/left4dead2/cfg</code></p>

			<p>
				If an <code>autoexec.cfg</code> file already exists, the contents of the <code>autoexec.cfg</code>
				in the archive should be appended to the existing file.
			</p>
			
			<p>
				Changes are applied at the start of the game unless the scripts are executed manually from
				the developer console.
			</p>
		</AccordionItem>
	</Accordion>
</Tile>

<Tile class="mt8">
	<h4>Transition Speed</h4>

	<Flex direction="column" gap="16px" alignItems="flex-start">
		<p>Due to the way the scripts get executed, the animation speed is dependent on the framerate.</p>

		<NumberInput label="Frames Per Second (Average)"
			on:change={state.save}
			bind:value={$state.averageFramerate}/>

		<TransitionsInput
			bind:value={$state.transitionsPerSecond}/>
	</Flex>
</Tile>

<DataTable class="glow-table mt8"
	title="Glow Configurations"
	description=""
	headers={glowHeaders}
	rows={glowRows}
	on:click:row={e => onEditGlow(e.detail.cvar)}>
	<Toolbar>
		<ToolbarContent>
			<Button icon={Upload} kind="ghost"
					on:click={onLoadConfig}
					title={
						'Either a ZIP archive generated with this tool, or the "glows.json" ' +
						'from within the archive can be loaded.'
					}>
				Load Config
			</Button>
			<Button icon={Download}
					on:click={onGenerateScripts}
					title={
						'Generates scripts that can be loaded in the game. ' +
						'See the "About" section for more details on how to install ' +
						'the scripts.'
					}>
				Generate Scripts
			</Button>
		</ToolbarContent>
		<ToolbarMenu icon={Menu} iconDescription="Menu">
			<ToolbarMenuItem on:click={onResetConfig}>
				Reset configuration
			</ToolbarMenuItem>
		</ToolbarMenu>
	</Toolbar>

	<div slot="cell-header"
			let:header class="flex items-center">
		{#if header.key == 'colors'}
			<span class="mr8">{header.value}</span>
			<PlayPauseButton />
		{:else}
			{header.value}
		{/if}
	</div>

	<span slot="cell" let:cell let:row class="cell-{cell.key}">
		{#if cell.key == 'actions'}
			<Button icon={ChevronRight} kind="ghost" iconDescription="Edit"
				href="/glow/{row.cvar}"
				on:click={gotoHref}/>
		{:else if cell.key == 'colors'}
			<ColorsPreview
				colors={getColors(row.cvar, $state)}
				transitionsPerSecond={getTransitionsPerSecond(row.cvar, $state.transitionsPerSecond)}
				animate={$animatedColors}/>
		{:else}
			{cell.value}
		{/if}
	</span>
</DataTable>

<style lang="less">
	:global
	{
		.glow-table
		{
			tbody tr
			{
				cursor: pointer;
			}

			tr td:last-child
			{
				text-align: right;
			}

			.cell-colors
			{
				display: block;
			}
		}
	}

	video
	{
		width: 100%;
		max-width: 800px;
	}
</style>
