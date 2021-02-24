<script type="text/typescript">
	import { Button, DataTable, NumberInput, Tile, Toolbar, ToolbarContent, ToolbarMenu, ToolbarMenuItem } from 'carbon-components-svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable';
	import Upload20 from 'carbon-icons-svelte/lib/Upload20';
	import Download20 from 'carbon-icons-svelte/lib/Download20';
	import ChevronRight20 from 'carbon-icons-svelte/lib/ChevronRight20';
	import Menu20 from 'carbon-icons-svelte/lib/Menu20';
	import DocumentImport20 from 'carbon-icons-svelte/lib/DocumentImport20';
	import { defaultState, glows, state } from '../data';
	import type { State } from '../data';
	import { generateScripts } from '../logic/script-generator';
	import JSZip from 'jszip';
	import { alert, confirm } from '../utility/dialogs';
	import ColorsPreview from './colors-preview.svelte';
	import { sample } from '../data/sample-config';
	import cloneDeep from 'clone-deep';
	import { readFile } from '../utility/files';
	import { animatedColors } from '../utility/preferences';
	import TransitionsInput from './utility/transitions-input.svelte';
	import PlayPauseButton from './utility/play-pause-button.svelte';

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

	function onToggleExample(e: Event)
	{
		const details = e.currentTarget as HTMLDetailsElement;
		showVideo = details.open;
	}

	function onEditGlow(cvar: string)
	{
		document.location.href = `#/glow/${cvar}`;
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
			zip.file('glows.json', JSON.stringify($state));
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

	summary
	{
		cursor: pointer;
	}

	video
	{
		width: 100%;
		max-width: 800px;
	}
</style>

<svelte:window bind:innerWidth />

<Tile>
	<h4>About</h4>

	<p>This is an animated outline glow script generator for <em>Left 4 Dead</em> and <em>Left 4 Dead 2</em>.</p>

	<details class="mt16" on:toggle={onToggleExample}>
		<summary>Example</summary>

		<p>
			Demonstration of <code>Item</code> and <code>Item Far</code> glows.
		</p>

		{#if showVideo}
			<video src="../data/example-video.webm" class="mt8"
				autoplay loop muted />
		{/if}

		<div class="mt8">
			<Button icon={DocumentImport20}
				on:click={onLoadExampleConfig}>
				Load example config
			</Button>
		</div>
	</details>

	<details class="mt16">
		<summary>Installing the generated scripts</summary>

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
	</details>
</Tile>

<Tile class="mt8">
	<h4>Transition Speed</h4>

	<p>Due to the way the scripts get executed, the animation speed is dependent on the framerate.</p>

	<NumberInput label="Frames Per Second (Average)" class="mt16"
		on:change={state.save}
		bind:value={$state.averageFramerate}/>

	<TransitionsInput class="mt16"
		bind:value={$state.transitionsPerSecond}/>
</Tile>

<DataTable class="glow-table mt8"
	title="Glow Configurations"
	description=""
	headers={glowHeaders}
	rows={glowRows}
	on:click:row={e => onEditGlow(e.detail.cvar)}>

	<Toolbar>
		<ToolbarContent>
			<Button icon={Upload20} kind="ghost"
					on:click={onLoadConfig}
					title={
						'Either a ZIP archive generated with this tool, or the "glows.json" ' +
						'from within the archive can be loaded.'
					}>
				Load Config
			</Button>
			<Button icon={Download20}
					on:click={onGenerateScripts}
					title={
						'Generates scripts that can be loaded in the game. ' +
						'See the "About" section for more details on how to install ' +
						'the scripts.'
					}>
				Generate Scripts
			</Button>
		</ToolbarContent>
		<ToolbarMenu icon={Menu20} iconDescription="Menu">
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
			<Button icon={ChevronRight20} kind="ghost" iconDescription="Edit"
				on:click={() => onEditGlow(row.cvar)}/>
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