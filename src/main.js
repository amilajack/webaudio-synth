import './styles/main.styl'

import Synth from './modules/Synth'
import Wires from './modules/Wires'
import MIDI from './modules/MIDI'

import notes from './modules/_notes'

const synth = new Synth()
const midi = new MIDI(synth)

console.log(synth)
