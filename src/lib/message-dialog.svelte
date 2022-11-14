<script lang="ts">
	import { Modal } from 'carbon-components-svelte';

	export let title: string;
	export let message: string;
	export let danger: boolean | undefined;

	export let passiveModal: boolean | undefined;
	export let primaryButtonText: string | undefined;
	export let secondaryButtonText: string | undefined;
	export let onPrimaryButtonClick = () => open = false;
	export let onSecondaryButtonClick = () => open = false;
	export let open = true;
</script>

<Modal modalHeading={title} {danger} open={open}
	{primaryButtonText} {secondaryButtonText} {passiveModal}
	on:close
	on:submit={onPrimaryButtonClick}
	on:click:button--secondary={onSecondaryButtonClick}>
	{message}
</Modal>
