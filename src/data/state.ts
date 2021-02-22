import { localStorageStore } from './local-storage-store';

export const state = localStorageStore<State>('state', defaultState());

export function defaultState(): State
{
	return {
		version: 1,
		averageFramerate: 60,
		transitionsPerSecond: 3,
		config: {},
	};
}

export function getConfig(config: Record<string, GlowConfig>, cvar: string)
{
	if (cvar in config == false)
		config[cvar] = newGlowConfig();

	return config[cvar];
}

function newGlowConfig(): GlowConfig
{
	return {
		colors: [],
		transitionsPerSecond: {
			enabled: false,
			value: 3,
		}
	};
}

export interface State
{
	version: number,
	averageFramerate: number;
	transitionsPerSecond: number;
	config: Record<string, GlowConfig>;
}

export interface GlowConfig
{
	colors: string[];

	transitionsPerSecond: TransitionsOverride;
}

export interface TransitionsOverride
{
	enabled: boolean;
	value: number;
}