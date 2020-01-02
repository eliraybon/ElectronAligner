import React from 'react';

export default class Wildcards extends React.Component {
  constructor(props) {
    super(props);
    const { context, analyser } = this.props;

    document.addEventListener("DOMContentLoaded", () => {
      this.rain = document.getElementById('rain');
      const rainCtx = context.createMediaElementSource(this.rain);
      this.gain = context.createGain();
      rainCtx.connect(this.gain);
      this.gain.connect(analyser);
    })
  }

  toggleRain = () => {
    (this.rain.paused) ? this.rain.play() : this.rain.pause();
  }

  render() {
    return (
      <ul className="wildcards">
        <li
          className="wildcard"
          onClick={this.toggleRain}
          key="rain"
        >
        </li>
      </ul>
    )
  }
}