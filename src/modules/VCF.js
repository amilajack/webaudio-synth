import Knob from './Knob';


export default class VCF {
	constructor(context) {

		this.context = context;
		this.filter = this.context.createBiquadFilter();
		this.filter.type = 'lowpass';
		this.filter.frequency.value = 880;
		this.filter.Q.value = 1;

		this.input = this.filter;
		this.output = this.filter;

		this.init();
	}

	init = () => {

		const vcfFreqKnob = new Knob(
			'vcf__freq',
			{
				min: 			20,
				max: 			880,
				width: 			'60%',
				displayInput: 	true,
				change: 		freq => this.setFrequency(freq)
			}
		);

		const vcfQualKnob = new Knob(
			'vcf__q',
			{
				min: 			0,
				max: 			10,
				value:			'1',
				step: 			.1,
				width: 			'40%',
				displayInput: 	true,
				change: 		q => this.setQ(q)
			}
		);
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