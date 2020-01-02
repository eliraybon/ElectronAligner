export default class Kick {
  constructor(context, effects, sound) {
    this.context = context.rawContext;
    this.effects = effects;

    this.tone = sound.tone;
    this.volume = sound.volume;
    this.decay = sound.decay;
  }

  setup = () => {
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();
    this.osc.connect(this.gain);
    this.gain.connect(this.effects);
    // this.gain.connect(this.context.destination)
  }

  trigger = time => {
    if (!this.volume) return;
    this.setup();

    this.osc.frequency.setValueAtTime(this.tone, time + 0.001);
    this.gain.gain.setValueAtTime(this.volume, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + this.decay);
    this.gain.gain.exponentialRampToValueAtTime(0.01, time + this.decay);
    this.gain.gain.linearRampToValueAtTime(0, time + this.decay + 0.1)

    this.osc.start(time);

    this.osc.stop(time + this.decay + 0.1);
  }
}