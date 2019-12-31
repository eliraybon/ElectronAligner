import React from 'react';
import { act } from 'react-dom/test-utils';

export default class StepBarLight extends React.Component {
  render() {
    const { step, currentStep } = this.props;
    const activeLight = (step === currentStep) ? "active-light" : "";
    return <li className={`step-bar-light ${activeLight}`}></li>
  }
}