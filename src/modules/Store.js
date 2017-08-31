
export default class Store {
	constructor(settings) {

		this.settings = settings;

		this.subscribers = {};

	}

	subscribe = (moduleName, param, callback) => {

		let paramCallbacks = [];

		if (this.subscribers[moduleName]) {
			paramCallbacks = this.subscribers[moduleName][param];
		};

		console.log(moduleName, param, paramCallbacks);

		this.subscribers = Object.assign({}, this.subscribers, {
			[moduleName]: {
				[param]: paramCallbacks ? 
						[...paramCallbacks, callback]
						:
						[callback]
			}
		})
	}

	broadcast = (moduleName, param) => {
		this.subscribers[moduleName][param].map(paramCallback => paramCallback());
	}

	changeParam = (moduleName, param, value) => {
		// console.log(this.settings);
		this.settings = Object.assign({}, this.settings, {
			[moduleName]: {
				[param]: value
			}
		});
		// console.log(this.settings);
		// this.broadcast(moduleName, param);
	}
}

