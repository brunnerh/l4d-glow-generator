import type { State } from './state';

export const sample: Omit<State, 'averageFramerate'> = {
	"version": 1,
	"config": {
		"ability": {
			"colors": [
				"#ff0000",
				"#ff0000",
				"#ff0000",
				"#ffffff"
			],
			"transitionsPerSecond": {
				"enabled": true,
				"value": 8
			}
		},
		"ghost_infected": {
			"colors": [
				"#000000",
				"#49b2ff"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"infected": {
			"colors": [
				"#ff00ff",
				"#ffff00"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"infected_vomit": {
			"colors": [
				"#0000ff",
				"#ffffff"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"item": {
			"colors": [
				"#000000",
				"#00ff00",
				"#ffffff",
				"#00ff00"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"item_far": {
			"colors": [
				"#ff00ff",
				"#ffffff",
				"#ffff00",
				"#ffffff"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor": {
			"colors": [
				"#ff00ff",
				"#ffff00"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor_health_high": {
			"colors": [
				"#00ff00",
				"#89ff89",
				"#009500"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor_health_med": {
			"colors": [
				"#ff8500",
				"#ffbc37",
				"#ce5a00"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor_health_low": {
			"colors": [
				"#ff0000",
				"#ff7e7e",
				"#990000"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor_hurt": {
			"colors": [
				"#ffffff",
				"#00ff00"
			],
			"transitionsPerSecond": {
				"enabled": false,
				"value": 3
			}
		},
		"survivor_vomit": {
			"colors": [
				"#ffffff",
				"#0000ff"
			],
			"transitionsPerSecond": {
				"enabled": true,
				"value": 8
			}
		},
		"thirdstrike_item": {
			"colors": [
				"#ff0000",
				"#ffff00",
				"#00ff00",
				"#00ffff",
				"#0000ff",
				"#ff00ff"
			],
			"transitionsPerSecond": {
				"enabled": true,
				"value": 6
			}
		}
	},
	"transitionsPerSecond": 4
}