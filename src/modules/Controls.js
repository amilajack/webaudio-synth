import { defaultSettings as settings } from './_settings';

import Knob from './Knob';
import List from './List';


export default class Controls {
	constructor(controlsDescription, changeStoreParam) {

		this.controlsDescription = controlsDescription;
		this.changeStoreParam = changeStoreParam;

		this.controlsItems = [];

		this.init();
	}

	init = () => {

		let ctrl = this.controlsDescription;

		switch (ctrl.type) {
			case 'knob':
				this.controlsItems.push(new Knob(
					ctrl.id,
					ctrl.options,
					settings[ctrl.id],
					this.changeStoreParam
				));
				break;
			case 'list':
				this.controlsItems.push(new List(
					ctrl.id,
					this.changeStoreParam
				));
				break;
		};
	}
}