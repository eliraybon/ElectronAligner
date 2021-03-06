import React from 'react';

export default class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    const { analyser } = this.props;
    this.state = {
      mode: 'osc' //two modes: 'osc' and 'bar'
    };

    this.animation = null;

    document.addEventListener("DOMContentLoaded", () => {
      this.canvas = document.querySelector('.osc-canvas');
      this.canvasCtx = this.canvas.getContext("2d");
      this.WIDTH = this.canvas.width;
      this.HEIGHT = this.canvas.height;

      this.analyser =  analyser;

      // navigator.mediaDevices.getUserMedia({ audio: true })
      //   .then(stream => {
      //     const source = context.createMediaStreamSource(stream);
      //     source.connect(this.analyser);
      // })

      this.visualize();
    })
  }

  componentDidUpdate() {
    this.visualize();
  }


  visualize = () => {
    cancelAnimationFrame(this.animation);
    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    (this.state.mode === 'osc') ? this.drawOsc() : this.drawBars();
  }

  getColor = () => {
    switch (this.props.colorScheme) {
      case "future time":
        return "rgb(143, 97, 230)";
      case "sparks":
        return "rgb(231, 133, 41)";
      case "dokidoki":
        return "rgb(248, 103, 131)";
      case "free":
        return "rgb(71, 209, 222)";
      case "hxh":
        return "rgb(81, 145, 78)";
      default:
        return "rgb(143, 97, 230)";
    }
  }


  drawOsc = () => {


    this.analyser.fftSize = 2048;
    let bufferLength = this.analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    this.animation = requestAnimationFrame(this.drawOsc);

    this.analyser.getByteTimeDomainData(dataArray);
    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';//'rgb(256, 256, 256)';//'rgb(200, 200, 200)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = `${this.getColor()}`; //'rgb(0, 0, 0)';

    this.canvasCtx.beginPath();

    let sliceWidth = this.WIDTH * 1.0 / bufferLength;
    let x = 0;

    for (let i = 0; i < bufferLength; i++) {

      let v = dataArray[i] / 128.0;
      let y = v * this.HEIGHT / 2;

      if (i === 0) {
        this.canvasCtx.moveTo(x, y);
      } else {
        this.canvasCtx.lineTo(x, y);
      }

      x += sliceWidth;
    }

    this.canvasCtx.lineTo(this.canvas.width, this.canvas.height / 2);
    this.canvasCtx.stroke();
  }

  drawBars = () => {
    this.analyser.fftSize = 256;
    let bufferLengthAlt = this.analyser.frequencyBinCount;
    const dataArrayAlt = new Uint8Array(bufferLengthAlt);

    this.animation = requestAnimationFrame(this.drawBars);

    this.analyser.getByteFrequencyData(dataArrayAlt);

    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    let barWidth = (this.WIDTH / bufferLengthAlt) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];

      this.canvasCtx.fillStyle = `${this.getColor()}`//'rgb(' + (barHeight + 50) + ',97,230)';//'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvasCtx.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  }

  toggleMode = e => {
    e.preventDefault();
    if (this.state.mode === 'osc') {
      this.setState({ mode: 'bar' });
    } else {
      this.setState({ mode: 'osc' });
    }
  }

  render() {
    return (
      <div className="oscilloscope">
        <button className="visual-select" onClick={this.toggleMode}>
          <img
            className="wildcard-image"
            src="/assets/images/waveform-path-solid.svg"
            alt=""
          />
        </button>
        <canvas className="osc-canvas" />
      </div>
    )
  }
}
