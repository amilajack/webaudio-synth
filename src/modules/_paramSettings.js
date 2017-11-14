import { VENDOR } from './_helpers';


let defaultSettings = {
	// VCO
	'osc1__gain': 	0,
	'osc1__detune': 0,
	'osc1__wavetype': 'sine',
	'osc1__offset':	0,

	'osc2__gain': 	.95,
	'osc2__detune': 0,
	'osc2__wavetype': 'sawtooth',
	'osc2__offset':	0,

	'osc3__gain': 	0,
	'osc3__detune': 0,
	'osc3__wavetype': 'square',
	'osc3__offset':	0,

	// VCF
	'filter__freq': 3500,
	'filter__qual': 4,

	// LFO
	'lfo__amount': .15,
	'lfo__freq': 2,
	'lfo__wavetype': 'sine',

	// VCA
	'attack': 	.05,
	'decay': 	.1,
	'sustain': 	.6,
	'release': 	.1,

	// Delay
	'delay__gain':		.2,
	'delay__time': 		.3,
	'delay__feedback': 	.1,
	'delay__cutoff': 	1000,

	// Modulation
	modulation: {
		'lfo__out-1': 'osc2',
		'lfo__out-3': 'filter',
		'vca__out-2': 'osc1'
	},

	options: {
		midi: false,
		keyboard: true,
		visualization: (VENDOR === 'any-chrome')
	}

};


export { defaultSettings };