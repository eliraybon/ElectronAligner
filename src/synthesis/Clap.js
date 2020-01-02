export default class Clap {
  constructor(context, effects, sound) {
    this.context = context.rawContext;
    this.effects = effects;

    this.tone = sound.tone;
    this.volume = sound.volume;
    this.decay = sound.decay;
    this.pulseWidth = 0.025;
  }

  noiseBuffer() {
    const bufferSize = this.context.sampleRate;
    const buffer = this.context.createBuffer(1, bufferSize, this.context.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }
    return buffer;
  }

  setup() {
    this.noise = this.context.createBufferSource();
    this.noise.buffer = this.noiseBuffer();
    this.filter = this.context.createBiquadFilter();
    this.filter.type = 'bandpass';
    this.filter.frequency.value = this.tone * 2;
    this.envelope = this.context.createGain();


    this.noise.connect(this.filter);
    this.filter.connect(this.envelope);
    this.envelope.connect(this.effects);
    // this.envelope.connect(this.context.destination);
  }

  trigger = time => {
    if (!this.volume) return;
    this.setup();
    this.envelope.gain.setValueAtTime(this.volume, time);
    this.envelope.gain.exponentialRampToValueAtTime(0.1, time + this.pulseWidth);

    this.envelope.gain.setValueAtTime(this.volume, time + this.pulseWidth);
    this.envelope.gain.exponentialRampToValueAtTime(0.1, time + 2 * this.pulseWidth);

    this.envelope.gain.setValueAtTime(this.volume, time + 2 * this.pulseWidth);
    this.envelope.gain.exponentialRampToValueAtTime(0.001, time + this.decay);


    this.noise.start(time)
    this.noise.stop(time + this.decay);
  }
}