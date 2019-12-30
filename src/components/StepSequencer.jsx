import React from 'react';
import Tone from 'tone';

export default class StepSequeuncer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bpm: 120,
      playing: false
    };
  }

  render() {
    return (
      <div className="step-sequencer">
        Hello world
      </div>
    )
  }
}