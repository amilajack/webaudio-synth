import Store from './Store';
import VCO from './VCO';
import VCF from './VCF';
import LFO from './LFO';
import VCA from './VCA';
import Delay from './Delay';
import Keyboard from './Keyboard';
import ControlItem from './ControlItem';
import Wires from './Wires';
import Visual from './Visual';

import { controlItems } from './_interfaceSettings';
import { defaultSettings as settings } from './_paramSettings';
import { notes } from './_notes';


export default class Synth {
	constructor() {

		try {
			window.AudioContext = window.AudioContext || window.webkitAudioContext;
			this.context = new AudioContext();
		}
		catch (e) {
			alert('Web Audio API is not supported in this browser');
			return;
		};

		this.store = new Store(settings);


		// creating controls
		this.controls = [];

		controlItems.map(item => {
			this.controls.push(
				new ControlItem(
					item,
					this.store.changeParam,
					this.store.subscribe // for wavetype list select highlighting
				)
			);
		});


		// creating filter 
		this.VCF = new VCF(this.context);
		['freq', 'qual'].map(paramName => {
			this.store.subscribe(
				`filter__${paramName}`,
				() => this.VCF.set(paramName, this.store.settings[`filter__${paramName}`])
			)
		});


		this.VCOs = {};
		notes.map(note => {

			let newVCO = new VCO(this.context, note, this.VCF);
			
			// creating osclillators for every key(note)
			// and binding it with settings store
			Object.keys(newVCO.oscillators).forEach(oscName => {
				['gain', 'detune', 'wavetype', 'offset'].forEach(paramName => {
					this.store.subscribe(
						`${oscName}__${paramName}`,
						() => newVCO.set(
							oscName,
							paramName,
							this.store.settings[`${oscName}__${paramName}`]
						)
					)
				});
			});

			this.VCOs = Object.assign({}, this.VCOs, {
				[note]: newVCO
			});
		});

		// creating keyboard and bindings
		this.keyboard = new Keyboard(
			{ id: 'keyboard', startNote: 'C3' },
	
			(note, freq) => this.VCOs[note].play(freq), // 'keyPressed' event callback
			
			(note, freq) => this.VCOs[note].stop() // 'keyUp' event callback -> stop oscillators
		);


		// creating LFO modulator
		this.LFO = new LFO(
			this.context,
			{ VCOs: this.VCOs, VCF: this.VCF } // objects that will be modulated
		);
		['amount', 'freq', 'wavetype'].map(paramName => {
			this.store.subscribe(
				`lfo__${paramName}`,
				() => this.LFO.set(paramName, this.store.settings[`lfo__${paramName}`])
			)
		});
		// subscribe LFO for wires connection changes
		this.store.subscribe(
			'modulation',
			() => this.LFO.set('modulation', this.store.settings['modulation'])
		);



		// creating VCA (ADSR) modulator
		this.VCA = new VCA(this.context);
		['attack', 'decay', 'sustain', 'release'].map(paramName => {
			this.store.subscribe(
				`${paramName}`,
				() => this.VCA.set(paramName, this.store.settings[`${paramName}`])
			)
		});


		// creating delay
		this.Delay = new Delay(this.context);
		['gain', 'time', 'feedback', 'cutoff'].map(paramName => {
			this.store.subscribe(
				`delay__${paramName}`,
				() => this.Delay.set(paramName, this.store.settings[`delay__${paramName}`])
			)
		});


		// creating wires
		this.Wires = new Wires(
			this.store.settings.modulation, // default params
			this.store.changeParam
		);


		// creating visualization
		this.Visual = new Visual(this.context);

	
		this.init();
	}


	init = () => {

		this.overallGain = this.context.createGain();
		this.overallGain.gain.value = .5;

		// connections
		this.VCF.connect(this.Delay);
		this.VCF.connect(this.overallGain);
		this.Delay.connect(this.overallGain);
		this.overallGain.connect(this.Visual.input);
		this.Visual.connect(this.context.destination);

		console.log(this);

		document.body.classList.add('loaded');
	}
}