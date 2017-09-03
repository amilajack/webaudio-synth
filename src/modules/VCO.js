import Oscillator from './Oscillator';


export default class VCO {
	constructor(context, noteBind, outputNode) {

		this.context = context;
		this.noteBind = noteBind;
		this.outputNode = outputNode;
		this.oscillators = {};

		this.init();
	}

	init = () => {

		this.oscillators = {
			osc1: new Oscillator(this.context),
			osc2: new Oscillator(this.context),
			osc3: new Oscillator(this.context)
		};

		this.connect();
	}

	connect = () => {
		for (let osc in this.oscillators) {
			this.oscillators[osc].connect(this.outputNode);
		};
	}

	disconnect = () => {
		for (let osc in this.oscillators) {
			this.oscillators[osc].disconnect();
		};
	}

	set = (oscName, paramName, value) => {

		switch (paramName) {
			case 'frequency':
				for (let osc in this.oscillators) {
					this.oscillators[osc].setFrequency(value);
				};
				break;
			case 'gain':
				this.oscillators[oscName].setGain(value);
				break;
			case 'detune':
				this.oscillators[oscName].setDetune(value);
				break;
			case 'wavetype':
				this.oscillators[oscName].setWavetype(value);
				break;
		}

	}

	play = (freq) => {
		this.set(null, 'frequency', freq);
		for (let osc in this.oscillators) {
			this.oscillators[osc].play();
		};
	};

	stop = () => {
		for (let osc in this.oscillators) {
			this.oscillators[osc].stop();
		};
	}
}