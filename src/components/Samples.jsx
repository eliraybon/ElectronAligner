import React from 'react';

export default class Samples extends React.Component {
  render() {
    return (
      <div className="samples">
        <audio id="rain" src="/assets/sounds/rain.mp3" autoPlay={false} loop></audio>
        <audio id="science" src="/assets/sounds/science.mp3" autoPlay={false} loop></audio>
        <audio id="subway" src="/assets/sounds/subway.mp3" autoPlay={false} loop></audio>
        <audio id="synth" src="/assets/sounds/synth.mp3" autoPlay={false} loop></audio>
        <audio id="vinyl" src="/assets/sounds/vinyl.mp3" autoPlay={false} loop></audio>
        <audio id="cat" src="/assets/sounds/cat.mp3" autoPlay={false}></audio>
        <audio id="robot" src="/assets/sounds/robot.mp3" autoPlay={false}></audio>
        <audio id="dracula" src="/assets/sounds/dracula.mp3" autoPlay={false}></audio>
      </div>
    )
  }
}