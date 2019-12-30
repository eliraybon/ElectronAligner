import React from 'react';
import Step from './Step';

export default class Row extends React.Component {

  render() {
    return (
      <div>
        <ul className="row">
          {this.props.steps.map((step, i) => {
            return (
              <Step
                step={step}
                sound={this.props.sound}
                stepNumber={i}
                updateSequence={this.props.updateSequence}
                key={i}
              />
            )
          })}
        </ul>
      </div>
    )
  }
}