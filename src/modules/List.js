
export default class List {
	constructor(id, callback) {

		this.id = id;
		this.callback = callback;

		this.items = [];

		this.init();
	}

	init = () => {

		this.items = [...document.querySelectorAll(`#${this.id} li`)];

		this.items.map(item => {
			item.addEventListener('click', () => {
				this.selected = item.dataset.wavetype; // selected wavetype

				this.callback(this.id, this.selected);

				this.items.map(item => {
					if (item.dataset.wavetype === this.selected) {
						item.classList.add('selected');
					} else {
						item.classList.remove('selected');
					}
				});
			});
		});
	}
}