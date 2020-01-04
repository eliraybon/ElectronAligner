import React from 'react';

export default class SoundControls extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      muted: false
    };

    document.addEventListener('keydown', e => {
      switch (e.keyCode) {
        case 77:
          this.props.toggleMute();
          break;
        default:
          return;
      }
    })
  }

  updateSound = (e, sound, setting) => {
    const value = parseInt(e.currentTarget.value);
    this.props.updateSound(sound, setting, value);
  }

  toggleMute = () => {
    this.setState(state => ({ muted: !state.muted }));
    this.props.toggleMute();
  }

  render() {
    return (
      <div className="sound-controls">
        <input
          className="master-volume"
          type="range"
          value={this.props.masterVolume * 100}
          min={0}
          max={100}
          onChange={this.props.changeMasterVolume}
        />

        <button
          className="mute-button"
          onClick={this.toggleMute}
        >
          {this.state.muted && (
            <img
              className="wildcard-image"
              src="/assets/images/volume-mute-solid.svg"
              alt=""
            />
          )}

          {!this.state.muted && (
            <img
              className="wildcard-image"
              src="/assets/images/volume-up-solid.svg"
              alt=""
            />
          )}
        </button>

        <div className="sc-left">
          <div className="kick-controls">
            <h3 className="sound-label">Kick</h3>

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
            <h3 className="sound-label">Snare</h3>

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
              min={20}
              max={300}
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
        </div>

        <div className="sc-middle">
          <div className="setting-labels">
           <p>Volume</p>
           <p>Tone</p>
           <p>Decay</p>
          </div>

          <div className="setting-labels">
            <p>Volume</p>
            <p>Tone</p>
            <p>Decay</p>
          </div>
        </div>

        <div className="sc-right">
          <div className="hat-controls">
            <h3 className="sound-label">Hat</h3>

            <input
              className="hat-input"
              type="range"
              min={0}
              max={100}
              value={this.props.hat.volume * 100}
              onChange={e => this.updateSound(e, 'hat', 'volume')}
            />

            <input
              className="hat-input"
              type="range"
              min={100}
              max={350}
              value={this.props.hat.tone}
              onChange={e => this.updateSound(e, 'hat', 'tone')}
            />

            <input
              className="hat-input"
              type="range"
              min={0}
              max={200}
              value={this.props.hat.decay * 100}
              onChange={e => this.updateSound(e, 'hat', 'decay')}
            />
          </div>

          <div className="clap-controls">
            <h3 className="sound-label">Clap</h3>

            <input
              className="clap-input"
              type="range"
              min={0}
              max={100}
              value={this.props.clap.volume * 100}
              onChange={e => this.updateSound(e, 'clap', 'volume')}
            />

            <input
              className="clap-input"
              type="range"
              min={300}
              max={1000}
              value={this.props.clap.tone}
              onChange={e => this.updateSound(e, 'clap', 'tone')}
            />

            <input
              className="clap-input"
              type="range"
              min={0}
              max={75}
              value={this.props.clap.decay * 100}
              onChange={e => this.updateSound(e, 'clap', 'decay')}
            />
          </div>
        </div>
      </div>
    )
  }
}