import React from 'react';
import { Transport } from 'tone';
import LogoAndButtons from './Main/LogoAndButtons';
import Oscilloscope from './Main/Oscilloscope';
import SoundControls from './Main/SoundControls';
import Wildcards from './Main/Wildcards';
import StepSequencer from './Sequencer/StepSequencer';

export default class DrumBoy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      playing: false,
      colorScheme: '--color--'
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

  changeColorScheme = e => {
    e.preventDefault();
    this.setState({ colorScheme: e.target.value })
  }

  render() {
    return (
      <div className="drum-boy">

        <div className="main">
          <div className="top">
            <LogoAndButtons 
              bpm={this.state.bpm}
              playing={this.state.playing}
              togglePlay={this.togglePlay}
              updateBpm={this.updateBpm}
              changeColorScheme={this.changeColorScheme}
              colorScheme={this.state.colorScheme}
            />

            <Oscilloscope 
              colorScheme={this.state.colorScheme}
            />

            <SoundControls 
              colorScheme={this.state.colorScheme}
            />
          </div>

          <Wildcards colorScheme={this.state.colorScheme} />
        </div>

        <StepSequencer 
          transport={Transport} 
          colorScheme={this.state.colorScheme}
        />
      </div>
    )
  }
}