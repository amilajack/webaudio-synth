import { colors } from './_colors';
import { modulationPortsIn, modulationPortsOut } from './_interfaceSettings'; 


export default class Wires {
	constructor() {

		this.init();
	}

	init = () => {
		this.canvas = document.getElementById('wires');

		// draw functions
		this.canvas.drawPort = (x, y, R = 5) => {
			const ctx = this.canvas.getContext('2d');
			ctx.beginPath();
	
			ctx.arc(x, y, R, 0, 2*Math.PI);
			ctx.lineWidth = 5;
			ctx.strokeStyle = colors.accent;
			ctx.stroke();
		};

		this.canvas.drawWire = (startPoint, endPoint) => {
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
			ctx.stroke();
		};
	
		// draw ports [in]
		modulationPortsIn.map(port => {
			this.canvas.drawPort(port.pos.x, port.pos.y);
		});

		// draw port [out]
		modulationPortsOut.map(portsGroup => {
			for (let i = 0; i < portsGroup.count; i++) {
				this.canvas.drawPort(
					portsGroup.pos.x + i*portsGroup.pos.distance, 
					portsGroup.pos.y
				);
			};
		});


		// 'caching'
		const bodyDOM = document.querySelector('body');


		let startPoint = {};
		// canvas click events
		this.canvas.addEventListener('mousedown', event => {
			bodyDOM.classList.add('on-wires-drawing');

			startPoint.x = event.offsetX;
			startPoint.y = event.offsetY;
	
			console.log(startPoint.x, startPoint.y);
		});

		this.canvas.addEventListener('mouseup', event => {
			bodyDOM.classList.remove('on-wires-drawing');

			let endPoint = {};
			
			endPoint.x = event.offsetX;
			endPoint.y = event.offsetY;

			console.log(endPoint.x, endPoint.y);

			this.canvas.drawWire(startPoint, endPoint);
		});


		console.log(this);
	}
}