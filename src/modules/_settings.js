
let defaultSettings = {
	vco: {
		'osc1__gain': 1,
		'osc1__detune': 0,
		'osc1__wavetype': 'sine',
		'osc2__gain': 0,
		'osc2__detune': 0,
		'osc2__wavetype': 'sawtooth',
		'osc3__gain': 0,
		'osc3__detune': 0,
		'osc3__wavetype': 'square'
	},
	vcf: {
		'freq': 6000,
		'qual': 1
	}
};

let ambientSettings = {
	vco: {
		'osc1__gain': 1,
		'osc1__detune': 0,
		'osc1__wavetype': 'sine',
		'osc2__gain': 1,
		'osc2__detune': 0,
		'osc2__wavetype': 'sawtooth',
		'osc3__gain': 1,
		'osc3__detune': 0,
		'osc3__wavetype': 'square'
	},
	vcf: {
		'freq': 6000,
		'qual': 1
	}
};


export {
	defaultSettings,
	ambientSettings
};