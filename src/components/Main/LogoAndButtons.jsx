import React from 'react';

export default class LogoAndButtons extends React.Component {
  render() {
    return (
      <div className="logo-and-buttons">
        <div className="logo-and-color">
          <div className="logo">
            <h1 className="main-heading">Drum Boy</h1>
            <p className="advance">Advance</p>
          </div>

          <p>Color select</p>
        </div>

        <div className="buttons">
          <div 
            className="play-button"
            onClick={this.props.togglePlay}
          >
            {(this.props.playing) ? "Pause" : "Play"}
          </div>

          <input
            className="bpm-select"
            type="number"
            value={this.props.bpm}
            onChange={this.props.updateBpm}
          />
        </div>
      </div>
    )
  }
}