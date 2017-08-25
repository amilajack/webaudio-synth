import knob from 'jquery-knob';


export default class VCO {
	constructor(context) {

		this.context = context;
		this.oscillator = this.context.createOscillator();
		this.oscillator.type = 'sine';
		this.setFrequency(440);
		this.oscillator.start(0);

		this.input = this.oscillator;
		this.output = this.oscillator;

		this.init();
	}

	init = () => {
		// creating container
		const vcoDOM = document.createElement('div');
		vcoDOM.className = 'vco';

		// creating knob controls
		const input = document.createElement('input');
		input.id = 'vco__freq';
		input.value = 220; // default freq [temp]
		
		vcoDOM.appendChild(input);
		document.getElementById('app').appendChild(vcoDOM);

		// init knob plugin
		$('#vco__freq').knob({
			'min':			20,
			'max':			880,
			'width': 		'45%',
			'bgColor':		'#555555',
			'fgColor':		'#C0ffff',
			'skin':			'tron',
			'thickness': 	.2,
			'angleOffset': 	-125,
			'angleArc':		250,
			'font':			'Orbitron',
			'cursor':		20,
			'change': freq => this.setFrequency(freq)
		});
	}

	setWaveType = waveType => {
		this.oscillator.type = waveType;
	}

	setFrequency = frequency => {
		this.oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
	}

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
};