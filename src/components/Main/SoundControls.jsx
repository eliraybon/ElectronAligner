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
        <div className="sc-left">
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

        <div className="sc-right">
          <div className="hat-controls">
            <h3>Hat</h3>

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
        </div>
      </div>
    )
  }
}