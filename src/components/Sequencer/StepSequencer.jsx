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

    const { transport, analyser, kick, snare, hat, clap } = this.props;

    this.transport = transport;
    this.context = transport.context;
    this.analyser = analyser;

    this.kick = new Kick(this.context, this.analyser, kick);
    this.snare = new Snare(this.context, this.analyser, snare);
    this.hat = new Hat(this.context, this.analyser, hat);
    this.clap = new Clap(this.context, this.analyser, clap);

    this.kickSequence = new Sequence();
    this.snareSequence = new Sequence();
    this.hatSequence = new Sequence();
    this.clapSequence = new Sequence();

    transport.scheduleRepeat(this.repeat, '16n');

    //sets up keyboard drumming
    document.addEventListener('keydown', e => {
      console.log(e.keyCode);
      const time = this.props.transport.context.rawContext.currentTime;
      switch (e.keyCode) {  
        case 13: 
          this.setState({ step: 0 });
          break;
        case 65:
          this.kick.trigger(time);
          break;
        case 83:
          this.snare.trigger(time);
          break;
        case 68:
          this.hat.trigger(time);
          break;
        case 70:
          this.clap.trigger(time);
          break;
        default:
          return;
      }
    })
  }

  componentDidUpdate = prevProps => {
    const { kick, snare, hat, clap } = this.props;
    this.kick = new Kick(this.transport.context, this.analyser, kick);
    this.snare = new Snare(this.transport.context, this.analyser, snare);
    this.hat = new Hat(this.transport.context, this.analyser, hat);
    this.clap = new Clap(this.transport.context, this.analyser, clap);
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