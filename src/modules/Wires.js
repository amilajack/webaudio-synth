
export default class Wires {
	constructor() {

		this.init();
	}

	init = () => {
		this.canvas = document.getElementById('wires');
		this.context = this.canvas.getContext('2d');

		console.log(this);
	}
}