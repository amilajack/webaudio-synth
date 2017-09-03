import QwertyHancock from 'qwerty-hancock';


export default class Keyboard {
	constructor(options, keyDownCallback, keyUpCallback) {
		
		this.defaultOptions = {
			id: 'keyboard',
			width: 600,
			height: 150,
			startNote: 'C4',
			octaves: 2
		};

		this.options = Object.assign({}, this.defaultOptions, options);

		this.keyDownCallback = keyDownCallback;
		this.keyUpCallback = keyUpCallback;

		this.init();
	}

	init = () => {
		this.keyboard = new QwertyHancock(this.options);

		this.keyboard.keyDown = (note, freq) => this.handleKeyDown(note, freq);
		this.keyboard.keyUp = (note, freq) => this.handleKeyUp(note, freq);
	}

	handleKeyDown = (note, freq) => {
		this.keyDownCallback(note, freq);
	}
	
	handleKeyUp = (note, freq) => {
		this.keyUpCallback(note, freq);
	}
}