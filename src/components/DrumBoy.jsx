import React from 'react';
import StepSequencer from './Sequencer/StepSequencer';

export default class DrumBoy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      placeholder: null
    };
  }

  render() {
    return (
      <div className="drum-boy">
        <StepSequencer />
      </div>
    )
  }
}