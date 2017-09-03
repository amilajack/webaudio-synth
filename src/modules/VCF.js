import Knob from './Knob';


export default class VCF {
	constructor(context) {

		this.context = context;
		this.filter = this.context.createBiquadFilter();
		this.filter.type = 'lowpass';

		this.input = this.filter;
		this.output = this.filter;
	}

	setFrequency = freq => this.filter.frequency.value = freq;

	setQ = q => this.filter.Q.value = q;

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
};