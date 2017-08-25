import './styles/main.styl';

import VCO from './modules/VCO';


const context = new (window.AudioContext || window.webkitAudioContext)();

const vco = new VCO(context);

const gainNode = context.createGain();


vco.connect(gainNode);
gainNode.connect(context.destination);
// vco -> gainNode -> browser output