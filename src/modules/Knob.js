import knob from 'jquery-knob';


export default class Knob {
	constructor(id, options, callback) {
		
		this.defaultOptions = {
			min:			1,
			max:			100,
			step:			1,
			width: 			'50%',
			bgColor:		'#c0ffff',
			fgColor:		'#e5007c',
			thickness: 		.2,
			angleOffset: 	-125,
			angleArc:		250,
			displayInput:	true,
			font:			'Orbitron',
			cursor:			20,
			change: 		value => console.log(`${this.id}: ${value}`)
		};

		this.id = id || `new-knob-${~~(Math.random()* 100)}`;
		
		this.options = Object.assign({}, this.defaultOptions, options);

		this.init();
	}

	init = () => {
		
		let input = document.getElementById(this.id);


		if(!input) {
			let input = document.createElement('input');
			input.id = this.id;
			input.value = 1;
			document.body.appendChild(input);
		}

		console.log(knob);

		$('#' + this.id).knob(this.options);
	}
}