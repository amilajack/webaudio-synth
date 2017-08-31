import { defaultSettings as settings } from './_settings';

import Knob from './Knob';


export default class Controls {
	constructor(moduleName, controlsDescription, changeStoreParam) {

		this.moduleName = moduleName;
		this.controlsDescription = controlsDescription;
		this.changeStoreParam = changeStoreParam;

		this.controlsItems = [];

		console.log(this);

		this.init();
	}

	init = () => {

		this.controlsDescription.map(item => {
			switch (item.type) {
				case 'knob':
					this.controlsItems.push(new Knob(
							this.moduleName,
							item.id,
							item.options,
							settings[this.moduleName][item.id],
							this.changeStoreParam
					));
					break;
				case 'list':
					// console.log('not ready yet');
					break;
			};
		});
		
	}
}