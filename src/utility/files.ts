export function readFile<T extends 'string' | 'buffer'>(file: File, method: T) : Promise<T extends 'string' ? string : ArrayBuffer>
{
	return new Promise((res, rej) =>
	{
		const reader = new FileReader();
		reader.onerror = rej;
		reader.onload = () => res(reader.result as any);
		switch (method)
		{
			case 'string':
				reader.readAsText(file);
				break;
			case 'buffer':
				reader.readAsArrayBuffer(file);
				break;

			default:
				rej('Unknown method.');
		}
	})
}