import React from 'react';

export default class StepBarLight extends React.Component {
  render() {
    const { step, currentStep } = this.props;
    const activeLight = (step === currentStep) ? "active-light" : "";
    return <li className={`step-bar-light ${activeLight}`}></li>
  }
}