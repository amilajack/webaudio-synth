import Knob from './Knob';


export default class Oscillator {
	constructor(context, id) {

		this.context = context;
		this.oscillator = this.context.createOscillator();
		this.oscillator.type = 'sawtooth';
		this.setFrequency(440);
		this.oscillator.start();

		this.gain = 1;
		
		this.gainNode = this.context.createGain();
		this.gainNode.gain.value = this.gain; // default is muted

		this.input = this.oscillator;
		this.output = this.oscillator.connect(this.gainNode);

		this.init();
	}

	init = () => {

		const vcoFreqKnob = new Knob(
			'vco__freq',
			{
				min:			20,
				max:			880,
				width: 			'60%',
				displayInput: 	true,
				change: 		freq => this.setFrequency(freq)
			}
		);

		const vcoDetuneKnob = new Knob(
			'vco__detune',
			{
				min:			-200,
				max:			200,
				width:			'50%',
				thickness: 		.3,
				angleOffset: 	-80,
				cursor:			40,
				change: 		value => this.setDetune(value)
			}
		);
	}

	setWaveType = waveType => {
		this.oscillator.type = waveType;
	}

	setFrequency = freq => {
		if(isFinite(freq)) {
			this.oscillator.frequency.setValueAtTime(freq, this.context.currentTime);
		}
	}

	setDetune = value => {
		this.oscillator.detune.setValueAtTime(value, this.context.currentTime);
	}

	setGain = value => this.gain = value;

	play = (note, freq) => {
		this.lastNote = note;
		this.setFrequency(freq);
		this.gainNode.gain.value = this.gain;
	}

	stop = (note, freq) => {
		if (note === this.lastNote) {
			this.gainNode.gain.value = 0;
		}
	}

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
};