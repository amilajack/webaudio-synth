import knob from 'jquery-knob';
import { colors } from './colors';


export default class Knob {
	constructor(id, options) {
		
		this.defaultOptions = {
			min:			1,
			max:			100,
			step:			1,
			width: 			'50%',
			bgColor:		colors.primary,
			fgColor:		colors.accent,
			thickness: 		.2,
			angleOffset: 	-125,
			angleArc:		250,
			displayInput:	false,
			font:			'Orbitron',
			cursor:			20,
			change: 		value => console.log(`${this.id}: ${value}`),
			draw:			() => {}
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

		$('#' + this.id).knob(this.options);
	}
};