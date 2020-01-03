import React from 'react';
import Sequence from '../../util/Sequence';
import StepBar from './StepBar';
import Row from './Row';

import Kick from '../../synthesis/Kick';
import Snare from '../../synthesis/Snare';
import Hat from '../../synthesis/Hat';
import Clap from '../../synthesis/Clap';
 

export default class StepSequeuncer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };

    const { transport, effects, kick, snare, hat, clap } = this.props;

    this.transport = transport;
    this.context = transport.context;
    this.effects = effects;

    this.kick = new Kick(this.context, this.effects, kick);
    this.snare = new Snare(this.context, this.effects, snare);
    this.hat = new Hat(this.context, this.effects, hat);
    this.clap = new Clap(this.context, this.effects, clap);

    this.kickSequence = new Sequence();
    this.snareSequence = new Sequence();
    this.hatSequence = new Sequence();
    this.clapSequence = new Sequence();

    transport.scheduleRepeat(this.repeat, '16n');

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {  
        case 13: 
          e.preventDefault();
          this.setState({ step: 0 });
          break;
        default:
          return;
      }
    })

    document.addEventListener("DOMContentLoaded", () => {
      this.bootUpSequencer();
    });
  }

  componentDidUpdate = prevProps => {
    const { kick, snare, hat, clap } = this.props;
    this.kick = new Kick(this.transport.context, this.effects, kick);
    this.snare = new Snare(this.transport.context, this.effects, snare);
    this.hat = new Hat(this.transport.context, this.effects, hat);
    this.clap = new Clap(this.transport.context, this.effects, clap);
  }

  repeat = time => {
    if (this.kickSequence.steps[this.state.step]) this.kick.trigger(time);
    if (this.snareSequence.steps[this.state.step]) this.snare.trigger(time);
    if (this.hatSequence.steps[this.state.step]) this.hat.trigger(time);
    if (this.clapSequence.steps[this.state.step]) this.clap.trigger(time);
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
      case "clap":
        this.clapSequence.steps[stepNumber] = selected;
        break;
      default:
        return;
    }
  }

  bootUpSequencer = () => {
    debugger;
    this.props.toggleMute();
    this.props.togglePlay();
    setTimeout(() => {
      this.props.toggleMute();
      this.props.togglePlay();
      this.setState({ step: 0 });
    }, 1000)
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

        <Row
          steps={this.clapSequence.steps}
          sound="clap"
          updateSequence={this.updateSequence}
        />
      </div>
    )
  }
}