export default class Snare {
  constructor(context, analyser) {
    this.context = context.rawContext;
    this.analyser = analyser;
  }

  noiseBuffer = () => {
    const bufferSize = this.context.sampleRate;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = buffer.getChannelData(0);
    //check how many iterations this actually has to run. May be too slow
    //so you can experiment with another method
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
    this.noiseEnvelope.connect(this.context.destination);
    this.osc = this.context.createOscillator();
    this.osc.type = 'triangle';
    this.oscEnvelope = this.context.createGain();
    this.osc.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.analyser);
    // this.oscEnvelope.connect(this.context.destination);
  }

  trigger = time => {
    this.setup();

    this.noiseEnvelope.gain.setValueAtTime(1, time);
    this.noiseEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.2);
    this.noise.start(time)

    this.osc.frequency.setValueAtTime(100, time);
    this.oscEnvelope.gain.setValueAtTime(0.7, time);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.01, time + 0.1);
    this.osc.start(time)

    this.osc.stop(time + 0.2);
    this.noise.stop(time + 0.2);
  }
}