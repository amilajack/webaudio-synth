
const knobSize = {
	small:  60,
	medium: 90,
	big:	130,
	huge:	150
}


export const interfaceSettings = {
	'vco': [
		{
			type: 'knob',
			id: 'osc1__gain',
			options: {
				min: 0,
				max: 100,
				width:  knobSize.medium,
				height: knobSize.medium,
				displayInput: true
			}
		},
		{
			type: 'knob',
			id: 'osc1__detune',
			options: {
				width:  knobSize.small,
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
				max: 100,
				width:  knobSize.medium,
				height: knobSize.medium,
				displayInput: true
			},
		},
		{
			type: 'knob',
			id: 'osc2__detune',
			options: {
				width:  knobSize.small,
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
				max: 100,
				width:  knobSize.medium,
				height: knobSize.medium,
				displayInput: true
			}
		},
		{
			type: 'knob',
			id: 'osc3__detune',
			options: {
				width:  knobSize.small,
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
	],
	'vcf': [
		{
			type: 'knob',
			id: 'filter__freq',
			options: {
				min: 0,
				max: 6000,
				width: 	knobSize.big,
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
				width: 	knobSize.small,
				height: knobSize.small,
				thickness: .3,
			}
		},
	],
	'vca': [
		{
			type: 'knob',
			id: 'attack',
			options: {
				min: 0,
				max: 10,
				step: .1,
				width: 	knobSize.medium,
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
				width: 	knobSize.medium,
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
				width: 	knobSize.medium,
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
				width: 	knobSize.medium,
				height: knobSize.medium,
				displayInput: true,
			}
		}
	]
};