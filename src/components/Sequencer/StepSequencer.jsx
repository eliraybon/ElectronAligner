import React from 'react';
import Tone, { Transport } from 'tone';
import Sequence from '../../util/Sequence';
import Row from './Row';

import Kick from '../../synthesis/Kick';
import Snare from '../../synthesis/Snare';
import Hat from '../../synthesis/Hat';
 

export default class StepSequeuncer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      step: 0,
      playing: false,
    };

    // this.context = new AudioContext();
    this.context = Transport.context; 
    // console.log(Transport.context, this.context);
    this.kick = new Kick(this.context);
    this.snare = new Snare(this.context);
    this.hat = new Hat(this.context);

    this.kickSequence = new Sequence();
    this.snareSequence = new Sequence();
    this.hatSequence = new Sequence();

    Transport.bpm.value = 120;
    // this.loop = Transport.scheduleRepeat(this.repeat, '16n');
    const loop = new Tone.Loop(this.repeat, '16n').start(0);

    Transport.loop = true;
    Transport.swing = 0;
    Transport.loopEnd = "1m";

    document.addEventListener('keydown', e => {
      console.log(e.keyCode);
      switch(e.keyCode) {
        case 32: 
          this.togglePlay();
          break;
        case 13:
          this.setState({ step: 0 });
          break;
        default: 
          return;
      }
    })
  }

  // rebuild = () => {
  //   Transport.clear(this.loop);
  //   this.context = new AudioContext();

  //   this.kick = new Kick(this.context);
  //   this.snare = new Snare(this.context);
  //   this.hat = new Hat(this.context);

  //   this.loop = Transport.scheduleRepeat(this.repeat, '16n');
  //   Transport.start();
  // }

  repeat = time => {
    if (this.kickSequence.steps[this.state.step]) this.kick.trigger(time);
    if (this.snareSequence.steps[this.state.step]) this.snare.trigger(time);
    if (this.hatSequence.steps[this.state.step]) this.hat.trigger(time);
    this.setState(state => {
      return { step: ((state.step + 1) % 16)}
    })
    if (this.state.step === 0) {
      this.rebuild();
    }
  }

  updateSequence = (sound, stepNumber, selected) => {
    switch (sound) {
      case "kick":
        this.kickSequence.steps[stepNumber] = selected;
        break;
      case "snare":
        this.snareSequence.steps[stepNumber] = selected;
        break;
      case "hat":
        this.hatSequence.steps[stepNumber] = selected;
        break;
      default:
        return;
    }
  }

  togglePlay = () => {
    Transport.toggle();
    this.setState(state => {
      return { playing: !state.playing }
    });
  }

  updateBpm = e => {
    e.preventDefault();
    Transport.bpm.value = e.target.value;
    this.setState({ bpm: e.target.value })
  }

  render() {
    return (
      <div className="step-sequencer">
        <input
          type="number"
          value={this.state.bpm}
          onChange={this.updateBpm}
        />

        <div onClick={this.togglePlay}>
          {(this.state.playing) ? "Pause" : "Play"}
        </div>

        <Row
          steps={this.kickSequence.steps}
          sound="kick"
          updateSequence={this.updateSequence}
        />

        <Row
          steps={this.snareSequence.steps}
          sound="snare"
          updateSequence={this.updateSequence}
        />

        <Row
          steps={this.hatSequence.steps}
          sound="hat"
          updateSequence={this.updateSequence}
        />
      </div>
    )
  }
}