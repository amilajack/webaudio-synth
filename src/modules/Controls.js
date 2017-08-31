import { defaultSettings as settings } from './_settings';

import Knob from './Knob';


export default class Controls {
	constructor(name, items) {

		this.name = name;
		this.items = items;

		this.init();
	}

	init = () => {

		this.items.map(item => {
			switch (item.type) {
				case 'knob':
					let knob = new Knob(
							item.id,
							item.options,
							item.subscribers,
							settings[this.name][item.id]
					);
					break;
				case 'list':
					// console.log('not ready yet');
					break;
			};
		});
		
	}
}