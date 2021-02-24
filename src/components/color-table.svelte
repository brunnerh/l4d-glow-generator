<script type="text/typescript">
	import type { GlowConfig } from '../data';
	import { state } from '../data';
	import { Button, DataTable, Toolbar, ToolbarBatchActions, ToolbarContent } from 'carbon-components-svelte';
	import type { DataTableHeader } from 'carbon-components-svelte/types/DataTable/DataTable';
	import Add20 from 'carbon-icons-svelte/lib/Add20';
	import Edit20 from 'carbon-icons-svelte/lib/Edit20';
	import Delete20 from 'carbon-icons-svelte/lib/Delete20';

	export let colors: string[];

	let selectedRowIds: any[] = [];
	$: rows = colors.map((c, i) => ({ value: c, id: i }));

	const headers: DataTableHeader[] = [
		{ key: 'color', value: 'Color' },
		{ key: 'value', value: 'Value' },
		{ key: 'actions', empty: true },
	]

	function onAddColor()
	{
		colors = [...colors, '#000000'];
		
		state.save();
	}

	function onColorChanged(index: number, value: string)
	{
		colors = colors.map((c, i) => i == index ? value : c);

		state.save();
	}

	function onEdit(e: MouseEvent)
	{
		const button = e.currentTarget as HTMLButtonElement;
		const input = button.closest('tr')!
			.querySelector('.color-input') as HTMLElement;
		
		input.click();
	}

	function onDeleteColor(index: number)
	{
		colors = colors.filter((e, i) => i != index);
		
		state.save();
	}

	function onDeleteBatch()
	{
		const ids = new Set(selectedRowIds);

		colors = colors.filter((c, i) => ids.has(i) == false);
		selectedRowIds = [];

		state.save();
	}
</script>

<style>
	:global(.colors-table tr td:last-child)
	{
		text-align: right;
	}

	:global(.bx--data-table-header__description)
	{
		white-space: pre-line;
	}

	.color-input
	{
		width: 100%;
		padding: 0;
		background: none;
		border: none;
	}
</style>

<DataTable
		class="colors-table mt32"
		title="Colors"
		description="List of colors that the glow cycles between. The last color transitions to the first. If only one color is used, the glow will be static.

			The darker the color, the higher the transparency, black being fully transparent."
		{headers} {rows}
		selectable batchSelection
		bind:selectedRowIds>
	<Toolbar>
		<ToolbarBatchActions>
			<Button icon={Delete20} on:click={onDeleteBatch}>Delete</Button>
		</ToolbarBatchActions>
		<ToolbarContent>
			<Button icon={Add20} on:click={onAddColor}>Add Color</Button>
		</ToolbarContent>
	</Toolbar>

	<span slot="cell" let:cell let:row>
		{#if cell.key == 'color'}
			<input type="color" class="color-input" value={row.value}
				on:change={e => onColorChanged(row.id, e.currentTarget.value)}/>
		{:else if cell.key == 'actions'}
			<Button kind="ghost"
				icon={Edit20} iconDescription="Edit Color"
				on:click={e => onEdit(e)}/>
			<Button kind="ghost"
				icon={Delete20} iconDescription="Delete Color"
				on:click={() => onDeleteColor(row.id)}/>
		{:else}
			{cell.value}
		{/if}
	</span>
</DataTable>

{#if rows.length == 0}
	<div class="mt16">No colors have been added yet.</div>
{/if}