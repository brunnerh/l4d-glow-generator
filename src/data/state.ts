import type { GlowConfig } from './glows';
import { localStorageStore } from './local-storage-store';

export const state = localStorageStore<State>('state', defaultState());

export function defaultState(): State
{
	return {
		version: 1,
		framesPerTransition: 30,
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
		framesPerTransition: {
			enabled: false,
			value: 30,
		}
	};
}

export interface State
{
	version: number,
	framesPerTransition: number;
	config: Record<string, GlowConfig>;
}