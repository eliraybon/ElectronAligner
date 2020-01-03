import React from 'react';

export default class Wildcards extends React.Component {
  constructor(props) {
    super(props);
    const { context, effects } = this.props;
    this.state = {
      rain: false, 
      dog: false,
      cat: false, 
      robot: false, 
      bitCrusher: false, 
      chorus: false, 
      wah: false,
      pingPong: false
    };

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
    this.setState(state => ({ bitCrusher: !state.bitCrusher }));
    if (bitCrusher.wet.value === 0) {
      bitCrusher.wet.value = 1;
    } else {
      bitCrusher.wet.value = 0;
    }
  }

  toggleChorus = () => {
    const { chorus } = this.props;
    this.setState(state => ({ chorus: !state.chorus }));
    if (chorus.wet.value === 0) {
      chorus.wet.value = 1;
    } else {
      chorus.wet.value = 0;
    }
  }

  toggleWah = () => {
    const { wah } = this.props;
    this.setState(state => ({ wah: !state.wah }));
    if (wah.wet.value === 0) {
      wah.wet.value = 1;
    } else {
      wah.wet.value = 0;
    }
  }

  togglePingPong = () => {
    const { pingPong } = this.props;
    this.setState(state => ({ pingPong: !state.pingPong }));
    (pingPong.wet.value === 0) ? pingPong.wet.value = 0.5 : pingPong.wet.value = 0;
  }

  toggleRain = () => {
    this.setState(state => ({ rain: !state.rain }));
    (this.rain.paused) ? this.rain.play() : this.rain.pause();
  }

  render() {
    const bitCrusher = (this.state.bitCrusher) ? "active-effect" : "";
    const rain = (this.state.rain) ? "active-effect" : "";
    const chorus = (this.state.chorus) ? "active-effect" : "";
    const wah = (this.state.wah) ? "active-effect" : "";
    const pingPong = (this.state.pingPong) ? "active-effect" : "";

    return (
      <ul className="wildcards">
        <li
          className={`wildcard ${rain}`}
          onClick={this.toggleRain}
          key="rain"
        >
          <img
            className="wildcard-image"
            src="/assets/images/raindrops-solid.svg"
            alt=""
          />
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerBark}
          key="dog"
        >
          <img
            className="wildcard-image"
            src="/assets/images/dog-solid.svg"
            alt=""
          />
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerMeow}
          key="cat"
        >
          <img
            className="wildcard-image"
            src="/assets/images/cat-solid.svg"
            alt=""
          />
        </li>

        <li
          className="wildcard"
          // onClick={this.triggerBeepBoops}
          key="robot"
        >
          <img
            className="wildcard-image"
            src="/assets/images/robot-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${bitCrusher}`}
          onClick={this.toggleBitCrusher}
          key="donotpress"
        >
          <img
            className="wildcard-image"
            src="/assets/images/bomb-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${chorus}`}
          onClick={this.toggleChorus}
          key="chorus"
        >
          <img
            className="wildcard-image"
            src="/assets/images/cassette-tape-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${wah}`}
          onClick={this.toggleWah}
          key="wah"
        >
          <img
            className="wildcard-image"
            src="/assets/images/wave-sine-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${pingPong}`}
          onClick={this.togglePingPong}
          key="pong"
        >
          <img
            className="wildcard-image"
            src="/assets/images/table-tennis-solid.svg"
            alt=""
          />
        </li>


      </ul>
    )
  }
}