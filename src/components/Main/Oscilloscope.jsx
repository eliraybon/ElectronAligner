import React from 'react';

export default class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    const { context, analyser } = this.props;
    this.state = {
      mode: 'bar' //two modes: 'osc' and 'bar'
    }

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


  visualize = () => {
    this.canvasCtx.clearRect(0, 0, this.WIDTH, this.HEIGHT);
    (this.state.mode === 'osc') ? this.draw() : this.drawBars();
  }

  draw = () => {
    this.analyser.fftSize = 2048;
    let bufferLength = this.analyser.fftSize;
    const dataArray = new Uint8Array(bufferLength);
    let drawVisual = requestAnimationFrame(this.draw);

    this.analyser.getByteTimeDomainData(dataArray);
    this.canvasCtx.fillStyle = 'rgb(200, 200, 200)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    this.canvasCtx.lineWidth = 2;
    this.canvasCtx.strokeStyle = 'rgb(0, 0, 0)';

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

    const drawVisual = requestAnimationFrame(this.drawBars);

    this.analyser.getByteFrequencyData(dataArrayAlt);

    this.canvasCtx.fillStyle = 'rgb(0, 0, 0)';
    this.canvasCtx.fillRect(0, 0, this.WIDTH, this.HEIGHT);

    let barWidth = (this.WIDTH / bufferLengthAlt) * 2.5;
    let barHeight;
    let x = 0;

    for (let i = 0; i < bufferLengthAlt; i++) {
      barHeight = dataArrayAlt[i];

      this.canvasCtx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.canvasCtx.fillRect(x, this.HEIGHT - barHeight / 2, barWidth, barHeight / 2);

      x += barWidth + 1;
    }
  }

  render() {
    return (
      <div className="oscilloscope">
        <canvas className="osc-canvas" />
      </div>
    )
  }
}
