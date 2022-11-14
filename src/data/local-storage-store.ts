import { get, writable, type Writable } from 'svelte/store';

const application = 'l4d-glow-generator';

/**
 * Creates a store that saves and loads its value to/from local storage.
 * The value has to be JSON serializable.
 * @param keySuffix The key suffix to use for local storage.
 * @param initial The start value of the store if no value is stored.
 */
export function localStorageStore<T>(keySuffix: string, initial: T)
{
	const key = getKey(keySuffix);
	const loadedValue = localStorage.getItem(key);

	const store = writable<T>(
		loadedValue == null ? initial : JSON.parse(loadedValue)
	);

	store.subscribe(value =>
		localStorage.setItem(key, JSON.stringify(value))
	);

	return {
		...store,
		save()
		{
			localStorage.setItem(key, JSON.stringify(get(store)));
		},
	};
}

/**
 * Gets a local storage key a given suffix.
 * @param keySuffix The key suffix to use for local storage.
 */
export function getKey(keySuffix: string)
{
	return `${application}.${keySuffix}`;
}
