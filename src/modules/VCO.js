import Oscillator from './Oscillator';


export default class VCO {
	constructor(context, noteBind) {

		this.context = context;

	}

	init = () => {
		for(let i = 0; i < 3; i++) {
			this.oscillators.push(new Oscillator(this.context));
		}
	}

	updateSettings = (settings) => {
		settings.map((params, index) => {
			this.oscillators[index].setParams(params);
		});
	}
}