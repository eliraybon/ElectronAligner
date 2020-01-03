import React from 'react';

export default class LogoAndButtons extends React.Component {
  render() {
    return (
      <div className="logo-and-buttons">
        <div className="logo">
          <h1 className="main-heading">Electron Aligner</h1>
        </div>

        <div className="buttons">
          <div 
            className="play-button"
            onClick={this.props.togglePlay}
          >
            {this.props.playing && (
              <i className="fas fa-pause"></i>
            )}

            {!this.props.playing && (
              <i className="fas fa-play"></i>
            )}
          </div>

          {/* <input
            className="bpm-select"
            type="number"
            value={this.props.bpm}
            onChange={this.props.updateBpm}
          /> */}
          <div className="bpm-select">
            {this.props.bpm}
          </div>
        </div>

        <select
          className="color-select"
          value={this.props.colorScheme}
          onChange={e => this.props.changeColorScheme(e)}
        >
          <option
            className="color-option"
            value="--color--"
            disabled
          >
            --color--
          </option>
          <option className="color-option" value="default">default</option>
          <option className="color-option" value="classic">classic</option>
          <option className="color-option" value="dokidoki">dokidoki</option>
        </select>
      </div>
    )
  }
}