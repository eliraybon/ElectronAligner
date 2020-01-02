import React from 'react';
import Samples from './Samples';
import DrumBoy from './DrumBoy';

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
          Instructions
        </button>

        {this.state.instructions && (
          <div className="instructions-background" onClick={this.toggleInstructions}>
            <div className="instructions">
              <button>Close</button>
              I am the instructions
            </div>
          </div>
        )}
        <Samples />
        <DrumBoy />
      </main>
    )
  }
}