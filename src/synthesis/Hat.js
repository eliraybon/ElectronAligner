export default class Hat {
  constructor(context) {
    this.context = context;
    //ratios can be tweaked - experiment with the sound
    this.ratios = [1, 1.3420, 1.2312, 1.6532, 1.9523, 2.1523];
    this.tone = 130.81;
    this.decay = 0.5;
    this.volume = 1;
  }

  setup = () => {
    this.oscEnvelope = this.context.createGain();
    this.bndPass = this.context.createBiquadFilter();
    this.bndPass.type = 'bandpass';
    this.bndPass.frequency.value = 20000;
    this.bndPass.Q.value = 0.2;
    this.hipass = this.context.createBiquadFilter();
    this.hipass.type = "highpass";
    this.hipass.frequency.value = 5000;

    this.bndPass.connect(this.hipass);
    this.hipass.connect(this.oscEnvelope);
    this.oscEnvelope.connect(this.context.destination);
  }

  trigger = time => {
    if (this.volume === 0) return ;
    this.setup();
    this.ratios.forEach((ratio) => {
      const osc = this.context.createOscillator();
      osc.type = "square";
      osc.frequency.value = this.tone * ratio;
      osc.connect(this.bndPass);
      osc.start(time);
      osc.stop(time + this.decay);
    });
    this.oscEnvelope.gain.setValueAtTime(0.00001 * this.volume, time);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(1 * this.volume, time + 0.001 * this.decay);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * this.volume, time + 0.002 * this.decay);

    //reverse sound vv
    // this.oscEnvelope.gain.exponentialRampToValueAtTime(1 * this.volume, time + 1 * this.decay);
    // this.oscEnvelope.gain.exponentialRampToValueAtTime(0.3 * this.volume, time + 1.2 * this.decay);
    this.oscEnvelope.gain.exponentialRampToValueAtTime(0.00001 * this.volume, time + this.decay);
  }
}