import VCO from './VCO';
import VCF from './VCF';
import VCA from './VCA';
import Keyboard from './Keyboard';
import Controls from './Controls';


export default class Synth {
	constructor() {

		this.init();
	}

	init = () => {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
		}
		catch (e) {
			alert('Web Audio API is not supported in this browser');
		};

		// const vco = new VCO(context);
		this.vcf = new VCF(this.context);
		const gainNode = this.context.createGain();


		// const keyboard = new Keyboard();
		

		// vco.connect(vcf);
		// vcf.connect(gainNode);
		// gainNode.connect(context.destination);
	}
}


let controlsVCO = new Controls(
	'vco',
	[
		{
			type:	'knob',
			id:		'osc1__gain',
			options: {
				min: 0,
				max: 100,
				width: '60%',
				displayInput: true
			},
			subscribers: []
		},
		{
			type:	'knob',
			id:		'osc1__detune',
			options: {
				min: -2,
				max: 2,
				step: .5,
				thickness: .3
			}
		},
		{
			type:	'list',
			id:		'osc1__wavetype'
		},
		{
			type:	'knob',
			id:		'osc2__gain',
			options: {
				min: 0,
				max: 100,
				width: '60%',
				displayInput: true
			},
			subscribers: []
		},
		{
			type:	'knob',
			id:		'osc2__detune',
			options: {
				thickness: .3
			}
		},
		{
			type:	'list',
			id:		'osc2__wavetype'
		},
		{
			type:	'knob',
			id:		'osc3__gain',
			options: {
				min: 0,
				max: 100,
				width: '60%',
				displayInput: true
			},
			subscribers: []
		},
		{
			type:	'knob',
			id:		'osc3__detune',
			options: {
				thickness: .3
			}
		},
		{
			type:	'list',
			id:		'osc3__wavetype'
		},
	]
);