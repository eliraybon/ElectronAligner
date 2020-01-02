export default class Snare {
  constructor(context, analyser, sound) {
    this.context = context.rawContext;
    this.analyser = analyser;

    this.tone = sound.tone;
    this.volume = sound.volume;
    this.decay = sound.decay;
  }

  noiseBuffer = () => {
    const bufferSize = this.context.sampleRate;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = buffer.getChannelData(0);
    for (var i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    return buffer;
  }

  setup = () => {
    this.noise = this.context.createBufferSource();
    this.noise.buffer = this.noiseBuffer();
    var noiseFilter = this.context.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.value = 1000;
    this.noise.connect(noiseFilter);
    this.noiseEnvelope = this.context.createGain();
    noiseFilter.connect(this.noiseEnvelope);
    this.noiseEnvelope.connect(this.analyser);
    // this.noiseEnvelope.connect(this.context.destination);
    this.osc = this.context.createOscillator();
    this.osc.type = 'triangle';
    this.oscEnvelope = this.context.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.analyser);
    // this.oscEnvelope.connect(this.context.destination);
  }

  trigger = time => {
    if (!this.volume) return;
    this.setup();

    this.noiseEnvelope.gain.setValueAtTime(this.volume, time);
    this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + this.decay);
    this.noise.start(time)

    this.osc.frequency.setValueAtTime(this.tone, time);
    //still makes noise when no volume
    if (this.volume >= 0.7) {
      this.oscEnvelope.gain.setValueAtTime(0.5, time);
    } else {
      this.oscEnvelope.gain.setValueAtTime(this.volume, time);
    }
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    this.osc.start(time)

    //still decays when no decay 
    if (this.decay >= 0.2) {
      this.osc.stop(time + 0.2);
    } else {
      this.osc.stop(time + this.decay);
    }
  
    this.noise.stop(time + this.decay);
  }
}