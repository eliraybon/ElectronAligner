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

  //should you try setting up in the constructor to avoid repeat setup?
  trigger = time => {
    this.setup();

    this.osc.frequency.setValueAtTime(150, time);
    this.gain.gain.setValueAtTime(1, time);

    this.osc.frequency.exponentialRampToValueAtTime(0.01, time + 0.5);
    this.gain.gain.exponentialRampToValueAtTime(0.01, time + 0.5);

    this.osc.start(time);

    this.osc.stop(time + 0.5);
  }
}