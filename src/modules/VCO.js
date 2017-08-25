import knob from 'jquery-knob';


export default class VCO {
	constructor(context) {

		this.context = context;
		this.oscillator = this.context.createOscillator();
		this.oscillator.type = 'sawtooth';
		this.setFrequency(440);
		this.oscillator.start(0);

		this.input = this.oscillator;
		this.output = this.oscillator;

		this.init();
	}

	init = () => {

		// init knob plugin
		$('#vco__freq').knob({
			'min':			20,
			'max':			880,
			'width': 		'70%',
			'bgColor':		'#c0ffff',
			'fgColor':		'#e5007c',
			'thickness': 	.2,
			'angleOffset': 	-125,
			'angleArc':		250,
			'font':			'Orbitron',
			'cursor':		20,
			'change': freq => this.setFrequency(freq)
		});

		$('#vco__detune').knob({
			'min':			-200,
			'max':			200,
			'width': 		'50%',
			'bgColor':		'#c0ffff',
			'fgColor':		'#e5007c',
			'thickness': 	.3,
			'angleOffset': 	-90,
			'angleArc':		250,
			'font':			'Orbitron',
			'cursor':		40,
			'displayInput': false,
			'change': value => this.setDetune(value)
		});
	}

	setWaveType = waveType => {
		this.oscillator.type = waveType;
	}

	setFrequency = frequency => {
		this.oscillator.frequency.setValueAtTime(frequency, this.context.currentTime);
	}

	setDetune = value => {
		this.oscillator.detune.setValueAtTime(value, this.context.currentTime);
	}

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
};