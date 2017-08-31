import Store from './Store';
import VCO from './VCO';
import VCF from './VCF';
import VCA from './VCA';
import Keyboard from './Keyboard';
import Controls from './Controls';

import { interfaceSettings } from './_interfaceSettings';
import { defaultSettings as settings } from './_settings';


export default class Synth {
	constructor() {

		this.store = new Store(settings);

		console.log(this.store);

		this.controls = [];

		Object.keys(interfaceSettings).forEach(key => {
			this.controls.push({
				[key]: new Controls(
					key,
					interfaceSettings[key],
					this.store.changeParam
				)
			});
		});
		console.log(this.controls);

		this.vcos = {};

		this.keyboard = new Keyboard(
			{
				id: 'keyboard'
			},
			(note, freq) => {
				if (this.vcos[note]) {
					this.vcos[note].play(freq);
				} else {
					let newVCO = new VCO(this.context, note, this.vcosGainNode);

					Object.keys(newVCO.oscillators).forEach(oscName => {
						['gain', 'detune', 'wavetype'].forEach(paramName => {
							this.store.subscribe(
								'vco',
								`${oscName}__${paramName}`,
								() => newVCO.set(
									oscName,
									paramName,
									this.store.settings['vco'][`${oscName}__${paramName}`]
								)
							)
						});
					});

					this.vcos = Object.assign({}, this.vcos, {
						[note]: newVCO
					});
					this.vcos[note].play(freq);
				}
			},
			(note, freq) => {
				if (this.vcos[note]) {
					this.vcos[note].disconnect() // stop oscillators
				}
			}
		);

		this.init();
	}

	init = () => {
		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
		}
		catch (e) {
			alert('Web Audio API is not supported in this browser');
		};

		this.vcosGainNode = this.context.createGain();

		this.vcosGainNode.connect(this.context.destination);
		// const vco = new VCO(context);
		// this.vcf = new VCF(this.context);


		// const keyboard = new Keyboard();


		// vco.connect(vcf);
		// vcf.connect(gainNode);
		// gainNode.connect(context.destination);
	}
}