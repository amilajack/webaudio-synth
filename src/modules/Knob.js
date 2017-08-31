import knob from 'jquery-knob';
import { colors } from './_colors';


export default class Knob {
	constructor(id, options, subscribers, defaultValue = 0) {

		
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
			change: 		value => this.handleChange
		};
		
		this.id = id || `new-knob-${~~(Math.random()* 100)}`;
		
		this.options = Object.assign({}, this.defaultOptions, options);
		
		this.subscribers = subscribers;

		this.defaultValue = defaultValue;
		console.log(this.id + ' - ' + this.defaultValue);

		this.init();
	}

	init = () => {
		
		let input = document.getElementById(this.id);

		if(!input) {
			let input = document.createElement('input');
			input.id = this.id;
			input.value = 1;
			document.body.appendChild(input);
		};

		let knobID = '#' + this.id;

		$(knobID).knob(this.options);
		$(knobID).val(this.defaultValue).trigger('change');
	}

	handleChange = () => {
		this.subscribers.map(callback => callback());
	}
};