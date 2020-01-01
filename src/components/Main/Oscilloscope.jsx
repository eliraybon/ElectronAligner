import React from 'react';

export default class Oscilloscope extends React.Component {
  constructor(props) {
    super(props);
    const { context, analyser } = this.props;

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
    this.draw();
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

  render() {
    return (
      <div className="oscilloscope">
        <canvas className="osc-canvas" />
      </div>
    )
  }
}
