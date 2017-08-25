import './styles/main.styl';

import QwertyHancock from 'qwerty-hancock';

import VCO from './modules/VCO';
import VCF from './modules/VCF';


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


vco.connect(vcf);
vcf.connect(gainNode);
// gainNode.connect(context.destination);
// vco -> gainNode -> browser output


var keyboard = new QwertyHancock({
	id: 'keyboard',
	width: 600,
	height: 150,
	octaves: 2
});