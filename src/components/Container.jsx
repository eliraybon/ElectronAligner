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
              <button><i className="fas fa-times fa-2x"></i></button>
              <h2>Instructions</h2>
            </div>
          </div>
        )}
        <Samples />
        <DrumBoy />
      </main>
    )
  }
}