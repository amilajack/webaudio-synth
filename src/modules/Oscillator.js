import Knob from './Knob';


export default class Oscillator {
	constructor(context) {

		this.context = context;
	
		this.osc = this.context.createOscillator();
		this.gainNode = this.context.createGain();

		this.setWaveType('sawtooth');
		this.setFrequency(440);
		this.setGain(1);
		this.osc.start();
		

		this.input 	= this.osc;
		this.output = this.osc.connect(this.gainNode);
	}

	setFrequency = freq => {
		if(isFinite(freq)) {
			this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
		};
	}

	setGain = value => this.gainNode.gain.value = value;

	setDetune = value => {
		this.osc.detune.setValueAtTime(value, this.context.currentTime);
	}

	setWaveType = type => this.osc.type = type;

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}

	disconnect = () => this.output.disconnect();
};