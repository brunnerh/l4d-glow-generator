export const glows: GlowMetadata[] = [
	{
		label: "Ability",
		alias: "GlowAbility",
		cvar: "ability",
		description: "Infected that pounced a survivor (survivor view)",
	},
	{
		label: "Ability (Colorblind)",
		alias: "GlowAbilityCB",
		cvar: "ability_colorblind",
		description: "Infected that pounced a survivor (survivor view, colorblind mode)",
	},
	{
		label: "Ghost Infected",
		alias: "GlowGhost",
		cvar: "ghost_infected",
		description: "Infected that are in spawn mode (infected view)",
	},
	{
		label: "Infected",
		alias: "GlowInfected",
		cvar: "infected",
		description: "Infected (infected view)",
	},
	{
		label: "Infected Vomit",
		alias: "GlowInfectedVomit",
		cvar: "infected_vomit",
		description: "Survivors that have been vomited on (infected view)",
	},
	{
		label: "Item",
		alias: "GlowItem",
		cvar: "item",
		description: "Item that is close",
	},
	{
		label: "Item Far",
		alias: "GlowItemFar",
		cvar: "item_far",
		description: "Item that is far away",
	},
	{
		label: "Survivor",
		alias: "GlowSurvivor",
		cvar: "survivor",
		description: "Survivors (survivor view)",
	},
	{
		label: "Survivor Health High",
		alias: "GlowHealthHigh",
		cvar: "survivor_health_high",
		description: "Survivors with high health (infected view)",
	},
	{
		label: "Survivor Health High (Colorblind)",
		alias: "GlowHealthHighCB",
		cvar: "survivor_health_high_colorblind",
		description: "Survivors with high health (infected view, colorblind mode)",
	},
	{
		label: "Survivor Health Medium",
		alias: "GlowHealthMed",
		cvar: "survivor_health_med",
		description: "Survivors with medium health (infected view)",
	},
	{
		label: "Survivor Health Medium (Colorblind)",
		alias: "GlowHealthMedCB",
		cvar: "survivor_health_med_colorblind",
		description: "Survivors with medium health (infected view, colorblind mode)",
	},
	{
		label: "Survivor Health Low",
		alias: "GlowHealthLow",
		cvar: "survivor_health_low",
		description: "Survivors with low health (infected view)",
	},
	{
		label: "Survivor Health Low (Colorblind)",
		alias: "GlowHealthLowCB",
		cvar: "survivor_health_low_colorblind",
		description: "Survivors with low health (infected view, colorblind mode)",
	},
	{
		label: "Survivor Hurt",
		alias: "GlowSurvivorHurt",
		cvar: "survivor_hurt",
		description: "Survivors that are down, have been grabbed by a smoker or pounced by a hunter (survivor view)",
	},
	{
		label: "Survivor Vomit",
		alias: "GlowSurvivorVomit",
		cvar: "survivor_vomit",
		description: "Survivors that have been vomited on (survivor view)",
	},
	{
		label: "Thirdstrike Item",
		alias: "GlowThirdStrikeItem",
		cvar: "thirdstrike_item",
		description: "Items after one has been incapacitated three times, this glow is also used for non-rigid objects when playing a tank",
	},
	{
		label: "Thirdstrike Item (Colorblind)",
		alias: "GlowThirdStrikeItemCB",
		cvar: "thirdstrike_item_colorblind",
		description: "Items after one has been incapacitated three times, this glow is also used for non-rigid objects when playing a tank (colorblind mode)",
	},
];

export interface GlowMetadata
{
	label: string;
	alias: string;
	cvar: string;
	description: string;
}

export interface GlowConfig
{
	colors: string[];

	framesPerTransition: framesPerTransitionOverride;
}

export interface framesPerTransitionOverride
{
	enabled: boolean;
	value: number;
}