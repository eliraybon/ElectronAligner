import React from 'react';
import { Transport } from 'tone';
import StepSequencer from './Sequencer/StepSequencer';

export default class DrumBoy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      playing: false
    };

    Transport.bpm.value = 120;
    Transport.loop = true;
    Transport.swing = 0;
    Transport.loopEnd = "1m";

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
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
      <div className="drum-boy">
        <input
          type="number"
          value={this.state.bpm}
          onChange={this.updateBpm}
        />

        <div onClick={this.togglePlay}>
          {(this.state.playing) ? "Pause" : "Play"}
        </div>

        <StepSequencer transport={Transport} />
      </div>
    )
  }
}