import knob from 'jquery-knob';


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

		// init knob plugin
		$('#vcf__freq').knob({
			min:			20,
			'max':			880,
			'width': 		'60%',
			'bgColor':		'#c0ffff',
			'fgColor':		'#e5007c',
			'skin':			'tron',
			'thickness': 	.2,
			'angleOffset': 	-125,
			'angleArc':		250,
			'font':			'Orbitron',
			'cursor':		20,
			'change': freq => this.setFrequency(freq)
		});

		$('#vcf__q').knob({
			'min':			0,
			'max':			10,
			'step':			.1,
			'width': 		'40%',
			'bgColor':		'#c0ffff',
			'fgColor':		'#e5007c',
			'skin':			'tron',
			'thickness': 	.3,
			'angleOffset': 	-125,
			'angleArc':		250,
			'font':			'Orbitron',
			'cursor':		20,
			'change': q => this.setQ(q)
		});
	}

	setFrequency = freq => {
		this.filter.frequency.value = freq;
		console.log(this.filter);
	}

	setQ = q => {
		this.filter.Q.value = q;
		console.log(this.filter);
	}

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
};