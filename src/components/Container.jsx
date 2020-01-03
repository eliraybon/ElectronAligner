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
          <i className="fas fa-bars fa-2x"></i>
        </button>

        {this.state.instructions && (
          <div className="instructions-background" onClick={this.toggleInstructions}>
            <div className="instructions">
              <button><i className="fas fa-times"></i></button>
              <h2 className="instructions-header">Instructions</h2>
              <ul className="bullet-points">
                <li>Click the buttons in the grid to activate steps in the sequencer</li>
                <li>Press the Space Bar or Play Button to play and pause your sequence</li>
                <li>Press Enter the jump to the beginning of the sequence</li>
                <li>Use the up and down arrow keys to adjust the tempo</li>
                <li>Adjust the sliders in the top right to change the sounds live</li>
                <li>Activate the wildcard buttons in the middle row for unexpected effects</li>
              </ul>
            </div>
          </div>
        )}
        <Samples />
        <DrumBoy />
      </main>
    )
  }
}