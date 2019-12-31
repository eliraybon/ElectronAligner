import React from 'react';

export default class Step extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: props.step
    };
  }

  toggleSelect = () => {
    const { sound, stepNumber } = this.props;
    this.setState(state => {
      return { selected: !state.selected }
    });
    this.props.updateSequence(sound, stepNumber, !this.state.selected);
  }

  render() {
    let selected = (this.state.selected) ? "selected" : "";

    return (
      <li
        className={`step ${selected}`}
        onClick={this.toggleSelect}
      >
      </li>
    )
  }
}