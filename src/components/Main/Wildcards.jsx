import React from 'react';

export default class Wildcards extends React.Component {
  constructor(props) {
    super(props);
    const { context, effects } = this.props;
    this.state = {
      rain: false, 
      dracula: false, 
      cat: false, 
      robot: false, 
      bitCrusher: false, 
      chorus: false, 
      wah: false,
      pingPong: false,
      science: false,
      synth: false,
      subway: false,
      vinyl: false
    };

    document.addEventListener("DOMContentLoaded", () => {
      //rain
      this.rain = document.getElementById('rain');
      const rainCtx = context.createMediaElementSource(this.rain);
      this.rainGain = context.createGain();
      rainCtx.connect(this.rainGain);
      this.rainGain.connect(effects);

      //dracula 
      this.dracula = document.getElementById('dracula');
      const draculaCtx = context.createMediaElementSource(this.dracula);
      this.draculaGain = context.createGain();
      draculaCtx.connect(this.draculaGain);
      this.draculaGain.connect(effects);

      //cat
      this.cat = document.getElementById('cat');
      const catCtx = context.createMediaElementSource(this.cat);
      this.catGain = context.createGain();
      catCtx.connect(this.catGain);
      this.catGain.connect(effects);

      //robot 
      this.robot = document.getElementById('robot');
      const robotCtx = context.createMediaElementSource(this.robot);
      this.robotGain = context.createGain();
      robotCtx.connect(this.robotGain);
      this.robotGain.connect(effects);

      //science
      this.science = document.getElementById('science');
      const scienceCtx = context.createMediaElementSource(this.science);
      this.scienceGain = context.createGain();
      scienceCtx.connect(this.scienceGain);
      this.scienceGain.connect(effects);

      //synth
      this.synth = document.getElementById('synth');
      const synthCtx = context.createMediaElementSource(this.synth);
      this.synthGain = context.createGain();
      synthCtx.connect(this.synthGain);
      this.synthGain.connect(effects);

      //subway
      this.subway = document.getElementById('subway');
      const subwayCtx = context.createMediaElementSource(this.subway);
      this.subwayGain = context.createGain();
      subwayCtx.connect(this.subwayGain);
      this.subwayGain.connect(effects);

      //vinyl
      this.vinyl = document.getElementById('vinyl');
      const vinylCtx = context.createMediaElementSource(this.vinyl);
      this.vinylGain = context.createGain();
      vinylCtx.connect(this.vinylGain);
      this.vinylGain.connect(effects);
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

  toggleScience = () => {
    this.setState(state => ({ science: !state.science }));
    (this.science.paused) ? this.science.play() : this.science.pause();
  }

  toggleSynth = () => {
    this.setState(state => ({ synth: !state.synth }));
    (this.synth.paused) ? this.synth.play() : this.synth.pause();
  }

  toggleSubway = () => {
    this.setState(state => ({ subway: !state.subway }));
    (this.subway.paused) ? this.subway.play() : this.subway.pause();
  }

  toggleVinyl= () => {
    this.setState(state => ({ vinyl: !state.vinyl }));
    (this.vinyl.paused) ? this.vinyl.play() : this.vinyl.pause();
  }

  playDracula = () => {
    if (!this.dracula.paused) return;
    this.setState({ dracula: true });
    this.dracula.play();
    setTimeout(() => {
      this.setState({ dracula: false });
    }, 5500);
  }

  triggerMeow = () => {
    if (!this.cat.paused) return;
    this.setState({ cat: true });
    this.cat.play();
    setTimeout(() => {
      this.setState({ cat: false });
    }, 1000);
  }

  tryAgain = () => {
    if (!this.robot.paused) return;
    this.setState({ robot: true });
    this.robot.play();
    setTimeout(() => {
      this.setState({ robot: false });
    }, 2000);
  }

  render() {
    const color = this.props.colorScheme;

    const bitCrusher = (this.state.bitCrusher) ? "active-effect" : "";
    const rain = (this.state.rain) ? "active-effect" : "";
    const chorus = (this.state.chorus) ? "active-effect" : "";
    const wah = (this.state.wah) ? "active-effect" : "";
    const pingPong = (this.state.pingPong) ? "active-effect" : "";
    const dracula = (this.state.dracula) ? "active-effect" : "";
    const cat = (this.state.cat) ? "active-effect" : "";
    const robot = (this.state.robot) ? "active-effect" : "";
    const science = (this.state.science) ? "active-effect" : "";
    const synth = (this.state.synth) ? "active-effect" : "";
    const subway = (this.state.subway) ? "active-effect" : "";
    const vinyl = (this.state.vinyl) ? "active-effect" : "";

    return (
      <ul className={`wildcards ${color}`}>
        <li
          className={`wildcard ${color} ${rain}`}
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
          className={`wildcard ${color} ${dracula}`}
          onClick={this.playDracula}
          key="dracula"
        >
          <img
            className="wildcard-image"
            src="/assets/images/bat-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${cat}`}
          onClick={this.triggerMeow}
          key="cat"
        >
          <img
            className="wildcard-image"
            src="/assets/images/cat-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${robot}`}
          onClick={this.tryAgain}
          key="robot"
        >
          <img
            className="wildcard-image"
            src="/assets/images/robot-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${science}`}
          onClick={this.toggleScience}
          key="science"
        >
          <img
            className="wildcard-image"
            src="/assets/images/flask-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${synth}`}
          onClick={this.toggleSynth}
          key="synth"
        >
          <img
            className="wildcard-image"
            src="/assets/images/piano-keyboard-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${subway}`}
          onClick={this.toggleSubway}
          key="subway"
        >
          <img
            className="wildcard-image"
            src="/assets/images/subway-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${vinyl}`}
          onClick={this.toggleVinyl}
          key="vinyl"
        >
          <img
            className="wildcard-image"
            src="/assets/images/turntable-solid.svg"
            alt=""
          />
        </li>

        <li
          className={`wildcard ${color} ${bitCrusher}`}
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
          className={`wildcard ${color} ${chorus}`}
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
          className={`wildcard ${color} ${wah}`}
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
          className={`wildcard ${color} ${pingPong}`}
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