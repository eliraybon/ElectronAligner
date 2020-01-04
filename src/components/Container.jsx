import React from 'react';
import Samples from './Samples';
import DrumBoy from './DrumBoy';
import Instructions from './Instructions';

export default class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      instructions: false
    };
  }

  toggleInstructions = () => {
    this.setState(state => ({ instructions: !state.instructions }));
  }

  render() {
    return (
      <main>
        <button
          className="instruction-button"
          onClick={this.toggleInstructions}
        >
          <i className="fas fa-bars fa-2x"></i>
        </button>

        {this.state.instructions && (
          <Instructions toggleInstructions={this.toggleInstructions} />
        )}
        <Samples />
        <DrumBoy />
      </main>
    )
  }
}