import { colors } from './_colors';
import { getRandom, convertColor } from './_helpers';


export default class Visual {
	constructor(context) {

		this.context = context;

		this.analyser = this.context.createAnalyser();
		this.analyser.fftSize = 512;

		this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount);
		
		this.input = this.analyser;
		this.output = this.analyser;

		this.init();
	}

	init = () => {

		this.canvas = document.getElementById('visual');

		this.canvas.width  = window.innerWidth;
		this.canvas.height = window.innerHeight;
		this.canvas.center = {
			x: (this.canvas.width  / 2),
			y: (this.canvas.height / 2)
		};

		const ctx = this.canvas.getContext('2d');

		const circleRadius = (this.canvas.height / 2.5);

		let circleAngle = [];	

		// create arcs angles
		for (let i = 0; i <= this.analyser.frequencyBinCount; i++) {
			let newCircleParams = {
				startAngle:		getRandom(-2*Math.PI, 2*Math.PI),
				endAngle:		getRandom(-2*Math.PI, 2*Math.PI)
			}
			circleAngle.push(newCircleParams);
		};

		// draw functions
		this.canvas.drawArc = (x, y, R, startAngle, endAngle, opacity) => {
			ctx.beginPath();

			ctx.arc(x, y, R, startAngle, endAngle);
			ctx.lineWidth = 1;
			ctx.strokeStyle = `rgba(${convertColor(colors.contrast).toDec()}, 
									${opacity})`;
			ctx.stroke();
		};


		const redraw = () => {

			this.analyser.getByteFrequencyData(this.frequencyData);

			// clear previous drawings
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);


			// curve left
			ctx.beginPath();
			ctx.moveTo(-1, this.canvas.height / 2);

			// direction
			let m = 1;

			for (let i = 0; i < this.analyser.frequencyBinCount; i++) {

				ctx.lineTo(
					i * (this.canvas.center.x / this.analyser.frequencyBinCount),
					((this.canvas.height + 64) / 2) - (m * this.frequencyData[i])
				);

				ctx.strokeStyle = `rgba(${convertColor(colors.accent).toDec()},
										${this.frequencyData[i] / 255})`;
				ctx.stroke();

				// change direction
				m *= -1;
			};

			// curve right
			// ctx.beginPath();
			// ctx.moveTo(this.canvas.width, this.canvas.height / 2);

			// for (let i = this.analyser.frequencyBinCount; i > 0; i--) {

			// 	ctx.lineTo(
			// 		this.canvas.width - (i * (this.canvas.center / this.analyser.frequencyBinCount)),
			// 		((this.canvas.height + 64) / 2) - (m * this.frequencyData[i])
			// 	);

			// 	ctx.strokeStyle = `rgba(${convertColor(colors.accent).toDec()},
			// 							${this.frequencyData[i] / 255})`;
			// 	ctx.stroke();

			// 	// change direction
			// 	m *= -1;
			// };


			// create many arcs
			for (let i = 0; i < this.analyser.frequencyBinCount; i++) {
				this.canvas.drawArc(
					this.canvas.center.x,
					this.canvas.center.y,
					circleRadius * (this.frequencyData[i] / 255),
					circleAngle[i].startAngle,
					circleAngle[i].endAngle,
					this.frequencyData[i] / 255
				);
			};
	
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