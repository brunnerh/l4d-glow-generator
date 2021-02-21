<script type="text/typescript">
	import { Button, DataTable, NumberInput, Tile, Toolbar, ToolbarContent, ToolbarMenu, ToolbarMenuItem } from 'carbon-components-svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable';
	import Upload20 from 'carbon-icons-svelte/lib/Upload20';
	import Download20 from 'carbon-icons-svelte/lib/Download20';
	import ChevronRight20 from 'carbon-icons-svelte/lib/ChevronRight20';
	import Menu20 from 'carbon-icons-svelte/lib/Menu20';
	import { defaultState, glows, state } from '../data';
	import type { State } from '../data';
	import { generateScripts } from '../logic/script-generator';
	import JSZip from 'jszip';
	import { alert, confirm } from '../utility/dialogs';

	const glowHeaders: DataTableHeader[] = [
		{ key: 'label', value: 'Glow Type' },
		{ key: 'description', value: 'Description' },
		{ key: 'colors', value: 'Colors' },
		{ key: 'actions', empty: true },
	]
	const glowRows = glows.map(g => ({ ...g, id: g.cvar }));

	function getColorCount(currentState: State, cvar: string)
	{
		const count = cvar in currentState.config ?
			currentState.config[cvar].colors.length :
			0;

		return count > 0 ? count : '';
	}

	function onEditGlow(cvar: string)
	{
		document.location.href = `/#/glow/${cvar}`;
	}

	async function onLoadConfig()
	{
		// TODO
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
		if (await confirm('Confirmation', 'Do you really want to reset the configuration?') == false)
			return;

		$state = defaultState();
	}

	function onLoadExampleConfig()
	{
		// TODO
	}
</script>

<style lang="less">
	:global
	{
		.glow-table
		{
			tr
			{
				cursor: pointer;
			}

			tr td:last-child
			{
				text-align: right;
			}
		}
	}
</style>

<Tile>
	This is an outline glow script generator for <em>Left 4 Dead</em> and <em>Left 4 Dead 2</em>.
</Tile>

<Tile class="mt8">
	<NumberInput label="Frames per transition"
		title={
			'The color transition speed depends on the framerate of the game. ' +
			'For example, if the game runs at 60 frames per second and one transition takes 30 frames, then ' +
			'two color transitions per second will happen.'
		}
		on:change={state.save}
		bind:value={$state.framesPerTransition}/>
</Tile>

<DataTable class="glow-table mt8"
	title="Glow Configurations"
	description=""
	headers={glowHeaders}
	rows={glowRows}
	on:click:row={e => onEditGlow(e.detail.cvar)}>

	<Toolbar>
		<ToolbarContent>
			<!-- <Button icon={Upload20} kind="ghost"
					on:click={onLoadConfig}>
				Load Config
			</Button> -->
			<Button icon={Download20}
					on:click={onGenerateScripts}>
				Generate Scripts
			</Button>
		</ToolbarContent>
		<ToolbarMenu icon={Menu20}>
			<ToolbarMenuItem on:click={onResetConfig}>
				Reset configuration
			</ToolbarMenuItem>
			<!-- <ToolbarMenuItem on:click={onLoadExampleConfig}>
				Load example config
			</ToolbarMenuItem> -->
		</ToolbarMenu>
	</Toolbar>

	<span slot="cell" let:cell let:row>
		{#if cell.key == 'actions'}
			<Button icon={ChevronRight20} kind="ghost" iconDescription="Edit"
				on:click={() => onEditGlow(row.cvar)}/>
		{:else if cell.key == 'colors'}
			{getColorCount($state, row.cvar)}
		{:else}
			{cell.value}
		{/if}
	</span>
</DataTable>