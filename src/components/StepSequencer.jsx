import React from 'react';
import Tone, { Transport } from 'tone';
import Sequence from '../util/Sequence';
import Kick from '../synthesis/Kick';

export default class StepSequeuncer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      step: 0,
      playing: false,
    };

    this.context = new AudioContext();

    this.kick = new Kick(this.context);

    this.kickSequence = new Sequence();

    Transport.bpm.value = 120;
    Transport.scheduleRepeat(this.repeat, '16n');

    Transport.loop = true;
    Transport.swing = 0;
    Transport.loopEnd = "1m";
  }

  repeat = time => {
    if (this.kickSequence.steps[this.state.step]) this.kick.trigger(time);
    this.setState(state => {
      return { step: ((state.step + 1) % 16)}
    })
  }

  togglePlay = () => {
    Transport.toggle();
    this.setState(state => {
      return { playing: !state.playing }
    });
  }

  render() {
    return (
      <div className="step-sequencer">
        <div onClick={this.togglePlay}>
          {(this.state.playing) ? "Pause" : "Play"}
        </div>
      </div>
    )
  }
}