
const knobSize = {
	small: 60,
	medium: 90,
	big: 130,
	huge: 150
};


const controlItems = [
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
			min: -100,
			max: 100,
			step: 1,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc1__wavetype'
	},
	{
		type: 'input',
		id: 'osc1__offset'
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
			min: -100,
			max: 100,
			step: 1,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc2__wavetype'
	},
	{
		type: 'input',
		id: 'osc2__offset'
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
			min: -100,
			max: 100,
			step: 1,
			thickness: .3
		}
	},
	{
		type: 'list',
		id: 'osc3__wavetype'
	},
	{
		type: 'input',
		id: 'osc3__offset'
	},

	// VCF
	{
		type: 'knob',
		id: 'filter__freq',
		options: {
			min: 32,
			max: 7902,
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
		id: 'lfo__amount',
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
		id: 'lfo__freq',
		options: {
			min: 0,
			max: 30,
			step: .1,
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


const modulationPorts = [
	// osc ports
	{
		name: 'osc1',
		type: 'in',
		pos: {
			x: 30,
			y: 450
		}
	},
	{
		name: 'osc2',
		type: 'in',
		pos: {
			x: 80,
			y: 450
		}
	},
	{
		name: 'osc3',
		type: 'in',
		pos: {
			x: 130,
			y: 450
		}
	},

	// filter ports
	{
		name: 'filter',
		type: 'in',
		pos: {
			x: 420,
			y: 225
		}
	},

	// lfo ports
	{
		name: 'lfo__out-1',
		type: 'out',
		pos: {
			x: 500,
			y: 445,
		}
	},
	{
		name: 'lfo__out-2',
		type: 'out',
		pos: {
			x: 530,
			y: 445,
		}
	},
	{
		name: 'lfo__out-3',
		type: 'out',
		pos: {
			x: 560,
			y: 445,
		}
	},
	{
		name: 'lfo__out-4',
		type: 'out',
		pos: {
			x: 590,
			y: 445,
		}
	},
	{
		name: 'lfo__out-5',
		type: 'out',
		pos: {
			x: 620,
			y: 445,
		}
	},

	// vca ports
	{
		name: 'vca__out-1',
		type: 'out',
		pos: {
			x: 700,
			y: 445,
		}
	},
	{
		name: 'vca__out-2',
		type: 'out',
		pos: {
			x: 730,
			y: 445,
		}
	},
	{
		name: 'vca__out-3',
		type: 'out',
		pos: {
			x: 760,
			y: 445,
		}
	},
	{
		name: 'vca__out-4',
		type: 'out',
		pos: {
			x: 790,
			y: 445,
		}
	},
	{
		name: 'vca__out-5',
		type: 'out',
		pos: {
			x: 820,
			y: 445,
		}
	}
];


export {
	controlItems,
	modulationPorts
};