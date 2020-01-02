import React from 'react';

export default class Wildcards extends React.Component {
  constructor(props) {
    super(props);
    const { context, effects } = this.props;

    document.addEventListener("DOMContentLoaded", () => {
      this.rain = document.getElementById('rain');
      const rainCtx = context.createMediaElementSource(this.rain);
      this.gain = context.createGain();
      rainCtx.connect(this.gain);
      this.gain.connect(effects);
    })
  }

  toggleBitCrusher = () => {
    const { bitCrusher } = this.props;
    if (bitCrusher.wet.value === 0) {
      bitCrusher.wet.value = 1;
    } else {
      bitCrusher.wet.value = 0;
    }
  }

  toggleChorus = () => {
    const { chorus } = this.props;
    if (chorus.wet.value === 0) {
      chorus.wet.value = 1;
    } else {
      chorus.wet.value = 0;
    }
  }

  toggleWah = () => {
    const { wah } = this.props;
    if (wah.wet.value === 0) {
      wah.wet.value = 1;
    } else {
      wah.wet.value = 0;
    }
  }

  togglePingPong = () => {
    const { pingPong } = this.props;
    (pingPong.wet.value === 0) ? pingPong.wet.value = 1 : pingPong.wet.value = 0;
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
          R
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerBark}
          key="dog"
        >
          Dog
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerMeow}
          key="cat"
        >
          Cat
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerBeepBoops}
          key="robot"
        >
          *Beep*
        </li>

        <li
          className="wildcard"
          onClick={this.toggleBitCrusher}
          key="donotpress"
        >
          Do not press
        </li>

        <li
          className="wildcard"
          onClick={this.toggleChorus}
          key="chorus"
        >
          Chorus
        </li>

        <li
          className="wildcard"
          onClick={this.toggleWah}
          key="wah"
        >
          Wah
        </li>

        <li
          className="wildcard"
          onClick={this.togglePingPong}
          key="pong"
        >
          PingPong
        </li>


      </ul>
    )
  }
}