
export default class LFO {
	constructor(context) {

		this.context = context;
		
		this.osc = this.context.createOscillator();
		this.osc.start();

		this.output = this.osc;
	}

	set = (paramName, value) => {

		switch (paramName) {
			case 'freq':
				this.osc.frequency.value = value;
				break;
			case 'wavetype':
				this.osc.type = value;
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

}