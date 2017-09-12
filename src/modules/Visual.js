import { colors } from './_colors';
import { getRandom, convertColor } from './_helpers';


export default class Visual {
	constructor(context) {

		this.context = context;

		this.analyser = this.context.createAnalyser();
		this.analyser.fftSize = 512;
		this.bufferLength = this.analyser.frequencyBinCount;

		this.frequencyData = new Uint8Array(this.bufferLength);
		this.timeDomainData = new Uint8Array(this.bufferLength)

		this.input = this.analyser;
		this.output = this.analyser;

		this.init();
	}

	init = () => {

		const WIDTH = window.innerWidth;
		const HEIGHT = window.innerHeight;
		const CENTER = {
			x: WIDTH / 2,
			y: HEIGHT / 2
		};

		const canvasBottom = document.querySelector('#visual .bottom');
		const canvasCenter = document.querySelector('#visual .center');
		const canvasTop = document.querySelector('#visual .top');

		canvasBottom.width = canvasCenter.width = canvasTop.width = WIDTH;
		canvasCenter.height = canvasBottom.height = HEIGHT;
		canvasTop.height = HEIGHT / 2;


		const canvasBottomContext = canvasBottom.getContext('2d');
		const canvasCenterContext = canvasCenter.getContext('2d');
		const canvasTopContext = canvasTop.getContext('2d');


		const circleRadius = (HEIGHT);

		// create arcs angles
		let circleAngle = [];

		for (let i = 0; i <= this.analyser.frequencyBinCount; i++) {
			let newCircleParams = {
				startAngle: getRandom(-2 * Math.PI, 2 * Math.PI),
				endAngle: getRandom(-2 * Math.PI, 2 * Math.PI)
			}
			circleAngle.push(newCircleParams);
		};


		// draw functions
		const drawArcs = ctx => {

			if (!ctx) return;

			// create many arcs
			for (let i = 0; i < this.bufferLength; i++) {

				ctx.beginPath();
				ctx.arc(
					CENTER.x,
					CENTER.y,
					circleRadius * (this.frequencyData[i] / 255),
					circleAngle[i].startAngle,
					circleAngle[i].endAngle
				);
				ctx.lineWidth = 1;
				ctx.strokeStyle = `rgba(${convertColor(colors.contrast).toDec()},
										${this.frequencyData[i] / 255})`;
				ctx.stroke();

			};

		};


		const drawCurve = ctx => {

			ctx.beginPath();

			ctx.lineWidth = 1;
			ctx.strokeStyle = `${colors.accent}`;

			let sliceWidth = WIDTH / this.bufferLength;
			let x = 0;
			let y = 0;

			for (let i = 0; i < this.bufferLength; i++) {

				y = (HEIGHT / 8) * (this.timeDomainData[i] / 255) + 127 + 16;

				if (i === 0) {
					ctx.moveTo(x, y);
				} else {
					ctx.lineTo(x, y);
				};

				x += sliceWidth;
			};

			ctx.globalAlpha = .5;
			ctx.stroke();
		};


		const drawGraph = ctx => {

			if (!ctx) return;

			ctx.beginPath();
			ctx.moveTo(WIDTH, CENTER.y);

			// direction
			let m = 1;

			for (let i = 0; i < this.bufferLength; i++) {

				ctx.lineTo(
					i * (WIDTH / this.bufferLength),
					(HEIGHT / 2 - (m * this.frequencyData[i]))
				);

				ctx.strokeStyle = `rgba(${convertColor(colors.accent).toDec()},
										${this.frequencyData[i] / 255})`;
				ctx.stroke();

				// change direction
				m *= -1;
			};

		};


		const redraw = () => {

			this.analyser.getByteFrequencyData(this.frequencyData);
			this.analyser.getByteTimeDomainData(this.timeDomainData);

			// clear previous drawings
			canvasBottomContext.clearRect(0, 0, WIDTH, canvasBottom.height);
			canvasCenterContext.clearRect(0, 0, WIDTH, canvasCenter.height);
			canvasTopContext.clearRect(0, 0, WIDTH, canvasTop.width)

			// drawCurve(canvasBottomContext);
			drawArcs(canvasCenterContext);
			drawCurve(canvasTopContext);
			drawGraph(canvasBottomContext);

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