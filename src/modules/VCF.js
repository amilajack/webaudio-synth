import Knob from './Knob';


export default class VCF {
	constructor(context) {

		this.context = context;
		this.filter = this.context.createBiquadFilter();
		this.filter.type = 'lowpass';

		this.input = this.filter;
		this.output = this.filter;
	}

	set = (paramName, value) => {

		switch (paramName) {
			case 'freq':
				this.filter.frequency.value = value;
				break;
			case 'qual':
				this.filter.Q.value = value;
				break;
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