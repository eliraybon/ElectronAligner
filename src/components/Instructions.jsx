import React from 'react';

export default class Instructions extends React.Component {
  render() {
    return (
      <div className="instructions-background" onClick={this.props.toggleInstructions}>
        <div className="instructions">
          <button><i className="fas fa-times"></i></button>
          <h2 className="instructions-header">Instructions</h2>
          <ul className="bullet-points">
            <li>Click the buttons in the grid to activate steps in the sequencer</li>
            <li>Press the Space Bar or Play Button to play and pause your sequence</li>
            <li>Press Enter to jump to the beginning of the sequence</li>
            <li>Use the up and down arrow keys to adjust the tempo</li>
            <li>Adjust the sliders in the top right to change the sounds live</li>
            <li>Activate the wildcard buttons in the middle row for unexpected effects</li>
          </ul>
        </div>
      </div>
    )
  }
}