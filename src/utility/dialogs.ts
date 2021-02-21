import MessageDialog from '../components/utility/message-dialog.svelte';

export function alert(title: string, message: string)
{
	return new Promise(res =>
	{
		const dialog = new MessageDialog({
			target: document.body,
			props: {
				title,
				message,
				passiveModal: true,
			},
		});

		dialog.$on('close', () =>
		{
			res(null);

			setTimeout(() => dialog.$destroy(), 2000);
		});
	})
}

export function confirm(title: string, message: string)
{
	return new Promise<boolean>(res =>
	{
		let result = false;

		const dialog = new MessageDialog({
			target: document.body,
			props: {
				title,
				message,
				primaryButtonText: 'Confirm',
				secondaryButtonText: 'Cancel',
				onPrimaryButtonClick()
				{
					result = true;

					dialog.$$set!({ open: false });
				},
			},
		});

		dialog.$on('close', () =>
		{
			res(result);

			setTimeout(() => dialog.$destroy(), 2000);
		});
	})
}