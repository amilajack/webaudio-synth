import './styles/main.styl';

import Knob from './modules/Knob';
import VCO from './modules/VCO';
import VCF from './modules/VCF';
import Keyboard from './modules/Keyboard';


let context;

try {
	window.AudioContext = window.AudioContext || window.webkitAudioContext;
	context = new AudioContext();
}
catch (e) {
	alert('Web Audio API is not supported in this browser');
};


const vco = new VCO(context);
const vcf = new VCF(context);
const gainNode = context.createGain();

const keyboard = new Keyboard(null, vco.play, vco.stop);



vco.connect(vcf);
vcf.connect(gainNode);
gainNode.connect(context.destination);

// vco -> gainNode -> browser output