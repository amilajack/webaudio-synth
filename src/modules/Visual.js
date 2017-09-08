
export default class Visual {
	constructor(context) {

		this.context = context;

		this.analyser = this.context.createAnalyser();
		this.analyser.fftSize = 1024;

		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
		
		this.input = this.analyser;
		this.output = this.analyser;

		this.init();
	}

	init = () => {

		this.canvas = document.getElementById('visual');

		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.center = {
			x: (this.canvas.width  / 2),
			y: (this.canvas.height / 2)
		};

		const circleRadius = 350;

		let circleAngle = [];
	
		const getRandom = (min = 0, max = 1) => {
			return (Math.random() * (max - min)) + min;
		};


		for (let i = 0; i <= this.analyser.frequencyBinCount; i++) {
			let newCircleParams = {
				startAngle:		getRandom(-2*Math.PI, 2*Math.PI),
				endAngle:		getRandom(-2*Math.PI, 2*Math.PI)
			}
			circleAngle.push(newCircleParams);
		};


		const ctx = this.canvas.getContext('2d');
		const redraw = () => {

			this.analyser.getByteFrequencyData(this.frequencyData);

			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
				ctx.beginPath();
				ctx.arc(
					this.canvas.center.x,
					this.canvas.center.y,
					this.frequencyData[i] * 1.5,
					circleAngle[i].startAngle,
					circleAngle[i].endAngle
				);
				ctx.lineWidth = 1;
				ctx.strokeStyle = `rgba(156, 217, 249, ${this.frequencyData[i] / 255})`; // opacity
				ctx.stroke();
			}

			//curve
			ctx.beginPath();
			ctx.moveTo(0, 2 * this.canvas.height / 3);
			// var prevX = 0,
				// prevY = 0;
			for (let i = 1; i < this.analyser.frequencyBinCount; i++) {

				ctx.lineTo(
					i * (this.canvas.width / this.analyser.frequencyBinCount),
					this.canvas.height - this.frequencyData[i] * 2
				);
				// ctx.bezierCurveTo(prevX, prevY, i*(width/analyser.frequencyBinCount), prevY , i*(width/analyser.frequencyBinCount), height-frequencyData[i]*2)

				// prevX= i*(width/analyser.frequencyBinCount);
				// prevY= height-frequencyData[i]*2;

				ctx.strokeStyle='rgba(156,217,249,'+(this.frequencyData[i]/255)+')';
				ctx.stroke();
			}

			//curve--circles
			for (let i = 1; i < this.analyser.frequencyBinCount; i++) {
				ctx.beginPath();

				ctx.arc(
					i * (this.canvas.width / this.analyser.frequencyBinCount),
					this.canvas.height - this.frequencyData[i] * 2,
					5,
					0,
					2 * Math.PI
				);
				ctx.lineWidth = 4;
				ctx.stokeStyle = `rgba(156,217,249, ${this.frequencyData[i] / 255})`;
				ctx.stroke();
			}
	
			requestAnimationFrame(redraw);
		}
		redraw();

	}

	connect = node => {
		if (node.hasOwnProperty('input')) {
			this.output.connect(node.input);
		} else {
			this.output.connect(node);
		};
	}
}