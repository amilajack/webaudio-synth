import { colors } from './_colors';
import { modulationPorts } from './_interfaceSettings';
import { defaultSettings } from './_paramSettings';


export default class Wires {
	constructor() {
		this.modulationSettings = defaultSettings.modulation;

		console.log(this.modulationSettings);

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
			ctx.lineWidth = 6;
			ctx.strokeStyle = '#111111';
			ctx.globalAlpha = opacity;
			ctx.stroke();

			ctx.lineWidth = 5;
			ctx.strokeStyle = colors.accent;
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
			ctx.lineWidth = 6;
			ctx.lineCap = 'round';
			ctx.strokeStyle = '#111111';
			ctx.globalAlpha = 1;
			ctx.stroke();

			ctx.lineWidth = 4;
			ctx.strokeStyle = colors.accent;
			ctx.stroke();
		};


		const bodyDOM = document.querySelector('body');
		let onDrawingCurve = false; // curve drawing state
		let highlightPortType;		// for fading port port with same type
		let mousePos = {};
		let startPort = {}; 
		let endPort = {};

		let selectedPort = {};


		// draw ports
		const drawPorts = (startPort) => {

			modulationPorts.map(port => {
				let portOpacity;

				if (startPort.type) {
					portOpacity = (startPort.type !== port.type || startPort.name === port.name) ? 1 : .5;
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

			Object.keys(this.modulationSettings).map(key => {
				this.canvas.drawCurve(
					(modulationPorts.find(item => item.name === key)).pos,
					(modulationPorts.find(item => item.name === this.modulationSettings[key])).pos
				);
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

		// mouse events
		this.canvas.addEventListener('mousemove', event => {
			mousePos.x = event.offsetX;
			mousePos.y = event.offsetY;
		});	

		this.canvas.addEventListener('mousedown', event => {
			
			let port = detectPort();

			if (port) { // if this is a port, not random place on canvas
				bodyDOM.classList.add('on-wires-drawing');
				startPort = {};
				endPort = {}; 	// clear previous

				if (port.type === 'out') {
					if (this.modulationSettings[port.name]) { // if this port in use
						
						startPort = modulationPorts.find(item => {
							return item.name === this.modulationSettings[port.name]
						});

						delete this.modulationSettings[port.name]; // delete previous entry

					} else {
						startPort = port
					}
					selectedPort = startPort;
					onDrawingCurve = true;
					return;
				};

				if (port.type === 'in') {

					let alreadyInUse = Object.keys(this.modulationSettings)
						.find(key => this.modulationSettings[key] === port.name);

					if (alreadyInUse) {
	
						Object.keys(this.modulationSettings).map(key => {
							if (this.modulationSettings[key] === port.name) {

								endPort = modulationPorts.find(item => item.name === key);
								delete this.modulationSettings[key] // delete previous entry

							}
						}); 
		
					} else {
						endPort = port;
					};
				};

				onDrawingCurve = true;
				return;
				
			};
		});

		this.canvas.addEventListener('mouseup', event => {

			let port = detectPort();

			if (port) {

				if (port.type === 'out') {

					if (this.modulationSettings[port.name]) {
						endDraw();
						return;
					};
					startPort = port;

				};

				if (port.type === 'in') {

					let alreadyInUse = Object.keys(this.modulationSettings).find(key => {
						return this.modulationSettings[key] === port.name;
					});

					if (alreadyInUse) {
						endDraw();
						return;
					};
					endPort  = port;

				};

	
				// add new wire
				if (startPort.pos && endPort.pos) {
					this.modulationSettings[startPort.name] = endPort.name;
				};

			};

			endDraw();
		});


		const endDraw = () => {
			onDrawingCurve = false;
			startPort = {};
			endPort = {};
			selectedPort = {};
			bodyDOM.classList.remove('on-wires-drawing');
		};

		const redraw = () => {
			const ctx = this.canvas.getContext('2d');

			// clear previous drawings
			ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

			drawPorts(selectedPort);
			drawWires();

			// draw new wire
			if (onDrawingCurve) {
				this.canvas.drawCurve(
					startPort.pos ? startPort.pos : mousePos,
					endPort.pos   ?  endPort.pos  : mousePos
				);
			};

			window.requestAnimationFrame(redraw);
		};
		redraw();

	}
}