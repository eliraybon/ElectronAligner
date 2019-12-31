import React from 'react';
import Sequence from '../../util/Sequence';
import StepBar from './StepBar';
import Row from './Row';

import Kick from '../../synthesis/Kick';
import Snare from '../../synthesis/Snare';
import Hat from '../../synthesis/Hat';
 

export default class StepSequeuncer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };

    const { transport } = this.props;

    this.context = transport.context;

    this.kick = new Kick(this.context);
    this.snare = new Snare(this.context);
    this.hat = new Hat(this.context);

    this.kickSequence = new Sequence();
    this.snareSequence = new Sequence();
    this.hatSequence = new Sequence();

    transport.scheduleRepeat(this.repeat, '16n');

    //sets up keyboard drumming
    document.addEventListener('keydown', e => {
      const time = this.props.transport.context.rawContext.currentTime;
      switch (e.keyCode) {
        case 65:
          this.kick.trigger(time);
          break;
        case 83:
          this.snare.trigger(time);
          break;
        case 68:
          this.hat.trigger(time);
          break;
        default:
          return;
      }
    })
  }

  repeat = time => {
    if (this.kickSequence.steps[this.state.step]) this.kick.trigger(time);
    if (this.snareSequence.steps[this.state.step]) this.snare.trigger(time);
    if (this.hatSequence.steps[this.state.step]) this.hat.trigger(time);
    this.setState(state => {
      return { step: ((state.step + 1) % 16)}
    })
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

  render() {
    return (
      <div className="step-sequencer">

        <StepBar currentStep={this.state.step} />

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