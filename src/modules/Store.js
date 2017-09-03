
export default class Store {
	constructor(settings) {

		this.settings = settings;

		// only settings structure
		this.subscribers = {};

	}

	subscribe = (paramName, callback) => {

		if (this.subscribers[paramName]) {
			let callbacks = this.subscribers[paramName];

			this.subscribers[paramName] = callbacks ?
				[...callbacks, callback]
				:
				[callback];
		} else {
			this.subscribers[paramName] = [callback];
		};

		// drop settings to new subscriber
		this.broadcast(paramName);

	}

	broadcast = (paramName) => {
		if (this.subscribers[paramName]) {
			this.subscribers[paramName].map(callback => callback());
		}
	}

	changeParam = (paramName, value) => {

		this.settings[paramName] = value;

		this.broadcast(paramName);
	}
}