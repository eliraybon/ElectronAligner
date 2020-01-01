import React from 'react';

export default class SoundControls extends React.Component {
  updateSound = (e, sound, setting) => {
    const value = parseInt(e.currentTarget.value);
    this.props.updateSound(sound, setting, value);
  }

  render() {
    debugger;
    return (
      <div className="sound-controls">

        <div className="kick-controls">
          <h3>Kick</h3>
          
          <input
            className="kick-input"
            type="range"
            min={0}
            max={100}
            value={this.props.kick.volume * 100}
            onChange={e => this.updateSound(e, 'kick', 'volume')}
          />

          <input
            className="kick-input"
            type="range"
            min={100}
            max={350}
            value={this.props.kick.tone}
            onChange={e => this.updateSound(e, 'kick', 'tone')}
          />

          <input
            className="kick-input"
            type="range"
            min={0}
            max={200}
            value={this.props.kick.decay * 100}
            onChange={e => this.updateSound(e, 'kick', 'decay')}
          />
        </div>

        <div className="snare-controls">
          <h3>Snare</h3>

          <input
            className="snare-input"
            type="range"
            min={0}
            max={100}
            value={this.props.snare.volume * 100}
            onChange={e => this.updateSound(e, 'snare', 'volume')}
          />

          <input
            className="snare-input"
            type="range"
            min={100}
            max={350}
            value={this.props.snare.tone}
            onChange={e => this.updateSound(e, 'snare', 'tone')}
          />

          <input
            className="snare-input"
            type="range"
            min={0}
            max={75}
            value={this.props.snare.decay * 100}
            onChange={e => this.updateSound(e, 'snare', 'decay')}
          />
        </div>
        {/* <input
          className="master-volume"
          type="range"
          min="-48"
          max="0"
          value={this.props.volume}
          onChange={e => this.props.changeVolume(e)}
        />

        <button onClick={this.props.toggleMute}>
          Mute
        </button> */}
      </div>
    )
  }
}