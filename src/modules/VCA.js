
export default class VCA {
	constructor() {
		
		this.output = this;
	}

	set = (paramName, value) => {
		
		switch (paramName) {
			case 'attack':
				this.attack = value;
				break;
			case 'decay':
				this.decay = value;
				break;
			case 'sustain':
				this.sustain = value;
				break;
			case 'release':
				this.release = value;
				break;
		}

		console.log(this);
	}
}