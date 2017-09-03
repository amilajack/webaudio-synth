import Knob from './Knob';


export default class Oscillator {
	constructor(context) {

		this.context = context;

		this.osc = this.context.createOscillator();
		this.osc.start();

		this.volume = this.context.createGain();

		this.gate = this.context.createGain();
		this.gate.gain.value = 0; // note off (muted)


		this.input = this.osc;
		this.osc.connect(this.volume);
		this.output = this.volume.connect(this.gate);
	}

	setFrequency = freq => {
		if (isFinite(freq)) {
			this.osc.frequency.setValueAtTime(freq, this.context.currentTime);
		};
	}

	setGain = value => this.volume.gain.value = value;

	setDetune = value => {
		this.osc.detune.setValueAtTime(value, this.context.currentTime);
	}

	setWavetype = type => this.osc.type = type;

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}

	disconnect = () => this.output.disconnect();

	play = () => {
		this.gate.gain.linearRampToValueAtTime(1, this.context.currentTime + 0.005); // 5 msec
	}

	stop = () => {
		this.gate.gain.linearRampToValueAtTime(0, this.context.currentTime + 0.005);
	};
};