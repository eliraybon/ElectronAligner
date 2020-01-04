import React from 'react';
import Step from './Step';

export default class Row extends React.Component {

  render() {
    return (
      <div className="row-container">
        <p className="track-label">{this.props.sound}</p>
        <ul className="row">
          {this.props.steps.map((step, i) => {
            return (
              <Step
                step={step}
                sound={this.props.sound}
                stepNumber={i}
                updateSequence={this.props.updateSequence}
                colorScheme={this.props.colorScheme}
                key={i}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}