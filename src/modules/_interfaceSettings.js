
const knobSize = {
	small: 60,
	medium: 90,
	big: 130,
	huge: 150
};


const interfaceSettings = [
	// VCO
	{
		type: 'knob',
		id: 'osc1__gain',
		options: {
			min: 0,
			max: 1,
			step: .01,
			width: knobSize.medium,
			height: knobSize.medium
		}
	},
	{
		type: 'knob',
		id: 'osc1__detune',
		options: {
			width: knobSize.small,
			height: knobSize.small,
			min: -2,
			max: 2,
			step: .5,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc1__wavetype'
	},
	{
		type: 'knob',
		id: 'osc2__gain',
		options: {
			min: 0,
			max: 1,
			step: .01,
			width: knobSize.medium,
			height: knobSize.medium
		},
	},
	{
		type: 'knob',
		id: 'osc2__detune',
		options: {
			width: knobSize.small,
			height: knobSize.small,
			min: -2,
			max: 2,
			step: .5,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc2__wavetype'
	},
	{
		type: 'knob',
		id: 'osc3__gain',
		options: {
			min: 0,
			max: 1,
			step: .01,
			width: knobSize.medium,
			height: knobSize.medium
		}
	},
	{
		type: 'knob',
		id: 'osc3__detune',
		options: {
			width: knobSize.small,
			height: knobSize.small,
			min: -2,
			max: 2,
			step: .5,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc3__wavetype'
	},

	// VCF
	{
		type: 'knob',
		id: 'filter__freq',
		options: {
			min: 30,
			max: 6000,
			width: knobSize.big,
			height: knobSize.big,
			displayInput: true
		}
	},
	{
		type: 'knob',
		id: 'filter__qual',
		options: {
			min: 0,
			max: 10,
			step: .1,
			width: knobSize.small,
			height: knobSize.small,
			thickness: .3,
		}
	},

	// LFO
	{
		type: 'knob',
		id: 'lfo__freq',
		options: {
			min: .25,
			max: 200,
			step: .05,
			width: knobSize.big,
			height: knobSize.big,
			displayInput: true,
		}
	},
	{
		type: 'list',
		id: 'lfo__wavetype'
	},

	// VCA (ADSR)
	{
		type: 'knob',
		id: 'attack',
		options: {
			min: 0,
			max: 10,
			step: .1,
			width: knobSize.medium,
			height: knobSize.medium,
			displayInput: true,
		}
	},
	{
		type: 'knob',
		id: 'decay',
		options: {
			min: 0,
			max: 10,
			step: .1,
			width: knobSize.medium,
			height: knobSize.medium,
			displayInput: true,
		}
	},
	{
		type: 'knob',
		id: 'sustain',
		options: {
			min: 0,
			max: 10,
			step: .1,
			width: knobSize.medium,
			height: knobSize.medium,
			displayInput: true,
		}
	},
	{
		type: 'knob',
		id: 'release',
		options: {
			min: 0,
			max: 10,
			step: .1,
			width: knobSize.medium,
			height: knobSize.medium,
			displayInput: true,
		}
	},

	// Delay
	{
		type: 'knob',
		id: 'delay__gain',
		options: {
			min: 0,
			max: 1,
			step: .01,
			width: knobSize.medium,
			height: knobSize.medium
		}
	},
	{
		type: 'knob',
		id: 'delay__time',
		options: {
			min: 0,
			max: 5,
			step: .01,
			width: knobSize.big,
			height: knobSize.big,
			// displayInput: true,
		}
	},
	{
		type: 'knob',
		id: 'delay__feedback',
		options: {
			min: 0,
			max: .9,
			step: .01,
			thickness: .3,
			width: knobSize.small,
			height: knobSize.small
		}
	},
	{
		type: 'knob',
		id: 'delay__cutoff',
		options: {
			min: 30,
			max: 6000,
			step: 1,
			width: knobSize.medium,
			height: knobSize.medium,
			displayInput: true,
		}
	}
];


const modulationPortsIn = [
	{
		id: 'osc1__gain',
		pos: {
			x: 30,
			y: 440
		}
	},
	{
		id: 'osc2__gain',
		pos: {
			x: 80,
			y: 440
		}
	},
	{
		id: 'osc3__gain',
		pos: {
			x: 130,
			y: 440
		}
	},
	{
		id: 'filter__freq',
		pos: {
			x: 410,
			y: 215
		}
	}
];


const modulationPortsOut = [
	{
		name: 'lfo',
		count: 6,
		pos: {
			x: 470,
			y: 400,
			distance: 30,
		}
	},
	{
		name: 'vca',
		count: 4,
		pos: {
			x: 690,
			y: 435,
			distance: 40,
		}
	}
];


export {
	interfaceSettings,
	modulationPortsIn,
	modulationPortsOut
};