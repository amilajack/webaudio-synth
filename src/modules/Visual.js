
export default class Visual {
	constructor(context) {

		this.context = context;

		this.init();
	}

	init = () => {

		this.canvas = document.getElementById('visual');

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;

		console.log(this.canvas.width, this.canvas.height);
	}

}