export default class Kick {
  constructor(context, analyser) {
    this.context = context.rawContext;
    this.analyser = analyser;
  }

  setup = () => {
    this.osc = this.context.createOscillator();
    this.gain = this.context.createGain();
    this.osc.connect(this.gain);
    this.gain.connect(this.analyser);
    // this.gain.connect(this.context.destination)
  }

  trigger = time => {
    this.setup();

    this.osc.frequency.setValueAtTime(150, time + 0.001);
    this.gain.gain.setValueAtTime(1, time + 0.1);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gain.gain.linearRampToValueAtTime(0, time + 0.5 + 0.1)

    this.osc.start(time);

    this.osc.stop(time + 0.5 + 0.1);
  }
}