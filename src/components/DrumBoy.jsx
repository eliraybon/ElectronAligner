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
      colorScheme: '--color--',
      kick: {
        volume: 1,
        tone: 150,
        decay: 0.5
      },
      snare: {
        volume: 1,
        tone: 100,
        decay: 0.2
      },
      hat: {
        volume: 1,
        tone: 130,
        decay: 0.5
      },
      clap: {
        volume: 1,
        tone: 600,
        decay: 0.3
      }
    };

    const context = Transport.context.rawContext;
    this.analyser = context.createAnalyser();
    this.analyser.connect(context.destination);

    Transport.bpm.value = 120;
    Transport.loop = true;
    Transport.swing = 0;
    Transport.loopEnd = "1m";

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 32:
          this.togglePlay();
          break;
        case 38: 
          this.updateBpmFromArrowKey(this.state.bpm + 1);
          break;
        case 40: 
          this.updateBpmFromArrowKey(this.state.bpm - 1);
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
    const bpm = e.target.value;
    if (bpm > 0 && bpm < 201) {
      Transport.bpm.value = bpm;
      this.setState({ bpm: e.target.value })
    }
  }

  updateBpmFromArrowKey = bpm => {
    if (bpm > 0 && bpm < 201) {
      Transport.bpm.value = bpm;
      this.setState({ bpm });
    }
  }

  changeColorScheme = e => {
    e.preventDefault();
    this.setState({ colorScheme: e.target.value })
  }

  updateSound = (sound, setting, value) => {
    this.setState(state => {
      const updatedSound = state[sound];
      if (setting === 'volume' || setting === 'decay') {
        updatedSound[setting] = value / 100;
      } else {
        updatedSound[setting] = value;
      }
      return { [sound]: updatedSound };
    })
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
              context={Transport.context.rawContext}
              analyser={this.analyser}
              colorScheme={this.state.colorScheme}
            />

            <SoundControls 
              kick={this.state.kick}
              snare={this.state.snare}
              hat={this.state.hat}
              clap={this.state.clap}
              updateSound={this.updateSound}
              colorScheme={this.state.colorScheme}
            />
          </div>

          <Wildcards colorScheme={this.state.colorScheme} />
        </div>

        <StepSequencer 
          transport={Transport} 
          analyser={this.analyser}
          kick={this.state.kick}
          snare={this.state.snare}
          hat={this.state.hat}
          clap={this.state.clap}
          colorScheme={this.state.colorScheme}
        />
      </div>
    )
  }
}