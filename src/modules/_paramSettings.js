
let defaultSettings = {
	// VCO
	'osc1__gain': 	0,
	'osc1__detune': 0,
	'osc1__wavetype': 'sine',
	'osc2__gain': 	.95,
	'osc2__detune': 0,
	'osc2__wavetype': 'sawtooth',
	'osc3__gain': 	0,
	'osc3__detune': 0,
	'osc3__wavetype': 'square',

	// VCF
	'filter__freq': 3500,
	'filter__qual': 4,

	// LFO
	'lfo__freq': 2,
	'lfo__wavetype': 'sine',

	// VCA
	'attack': 	0,
	'decay': 	0,
	'sustain': 	0,
	'release': 	0,

	// Delay
	'delay__gain':		.2,
	'delay__time': 		.3,
	'delay__feedback': 	.1,
	'delay__cutoff': 	1000,

	// Modulation
	modulation: {
		'lfo__out-1': 'osc2__gain',
		'lfo__out-3': 'filter__freq',
		'vca__out-2': 'osc1__gain'
	}

};


export { defaultSettings };