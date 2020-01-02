import React from 'react';

export default class Samples extends React.Component {
  render() {
    return (
      <div className="samples">
        <audio id="rain" src="/assets/sounds/rain.mp3" autoPlay={false} loop></audio>
      </div>
    )
  }
}