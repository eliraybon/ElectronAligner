import React from 'react';
import StepBarLight from './StepBarLight';

export default class StepBar extends React.Component {
  render() {
    return (
      <ul className="step-bar">
        {[...Array(16).keys()].map(num => {
          return (
            <StepBarLight 
              step={num} 
              currentStep={this.props.currentStep} 
              key={num}
            />
          )
        })}
      </ul>
    )
  }
}