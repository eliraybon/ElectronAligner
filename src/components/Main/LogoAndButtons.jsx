import React from 'react';

export default class LogoAndButtons extends React.Component {
  render() {
    const color = this.props.colorScheme;

    return (
      <div className={`logo-and-buttons ${color}`}>
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
          <option className="color-option" value="future time">Future Time</option>
          <option className="color-option" value="sparks">Sparks</option>
          <option className="color-option" value="dokidoki">Doki doki</option>
          <option className="color-option" value="free">Free</option>
          <option className="color-option" value="hxh">HxH</option>
        </select>
      </div>
    )
  }
}