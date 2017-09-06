import { colors } from './_colors';
import { modulationPorts } from './_interfaceSettings';
import { defautlSettings as settings } from './_paramSettings';


export default class Wires {
	constructor() {

		this.init();
	}

	init = () => {

		this.wires = [];

		this.canvas = document.getElementById('wires');

		// drawing functions
		this.canvas.drawCircle = (x, y, R = 5, opacity = 1) => {
			const ctx = this.canvas.getContext('2d');
			ctx.beginPath();
	
			ctx.arc(x, y, R, 0, 2*Math.PI);
			ctx.lineWidth = 5;
			ctx.strokeStyle = colors.accent;
			ctx.globalAlpha = opacity;
			ctx.stroke();
		};

		this.canvas.drawCurve = (startPoint, endPoint) => {
			const ctx = this.canvas.getContext('2d');

			ctx.beginPath();
			ctx.moveTo(startPoint.x, startPoint.y);

			let controlPoint = {
				x: (startPoint.x + endPoint.x) / 2,
				y: (startPoint.y + endPoint.y),
			};

			ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, endPoint.x, endPoint.y);
			ctx.lineWidth = 4;
			ctx.lineCap = 'round';
			ctx.strokeStyle = colors.accent;
			ctx.globalAlpha = 1;
			ctx.stroke();
		};


		// draw ports
		const drawPorts = (type, name) => {

			modulationPorts.map(port => {
				let portOpacity;

				if (type) {
					portOpacity = (type === port.type || name === port.name) ? 1 : .5;
				} else {
					portOpacity = 1;
				};

				this.canvas.drawCircle(
					port.pos.x,
					port.pos.y,
					5,
					portOpacity
				);
			});
		};

		const drawWires = () => {

			this.wires.map(wire => {
				this.canvas.drawCurve(wire.startPoint, wire.endPoint);
			});
	
		};

		const detectPort = (easing = 10) => {
			let detectedPort;

			modulationPorts.map(port => {
				if ( (mousePos.x >= (port.pos.x - easing)) && (mousePos.x <= (port.pos.x + easing)) ) {
					if ( (mousePos.y >= (port.pos.y - easing)) && (mousePos.y <= (port.pos.y + easing)) ) {
						detectedPort = port;
						return;
					}	
				};
			});

			return detectedPort;
		};


		const bodyDOM = document.querySelector('body');
		let onDrawingCurve = false; // curve drawing state
		let mousePos = {};
		let startPort, endPort = {};

		// mouse events
		this.canvas.addEventListener('mousemove', event => {
			mousePos.x = event.offsetX;
			mousePos.y = event.offsetY;
		});	

		this.canvas.addEventListener('mousedown', event => {
			
			startPort = detectPort();

			if (startPort) {
				bodyDOM.classList.add('on-wires-drawing');
				onDrawingCurve = true; // start drawing new curve
			};
		});

		this.canvas.addEventListener('mouseup', event => {

			endPort = detectPort();

			if (endPort && (endPort.type !== startPort.type)) {
				this.wires.push({
					startPort: 	(startPort.type === 'out') ? startPort.name : endPort.name,
					endPort:  	(endPort.type === 'in') ? endPort.name : startPort.name,
					startPoint: startPort.pos,
					endPoint: endPort.pos
				});
			};

			onDrawingCurve = false;
			bodyDOM.classList.remove('on-wires-drawing');
	
			console.log(this);
		});


		const redraw = () => {
			const ctx = this.canvas.getContext('2d');

			// clear previous drawings
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			drawPorts();
			drawWires();

			// draw new wire
			if (onDrawingCurve) {
				this.canvas.drawCurve(startPort.pos, mousePos);
			};

			window.requestAnimationFrame(redraw);
		};
		redraw();

	}
}