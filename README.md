<p align="center">
  <a href="https://eliraybon.github.io/ElectronAligner/">
    <img height="200px" src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/images/atom-duotone.svg">
  </a>
</p>

# <h1 align="center">Electron Aligner</h1>

[Live Link](https://eliraybon.github.io/ElectronAligner/)

The Electron Aligner is an interactive step sequencer and drum machine. Chiptune sounds are synthesized from scrach using the Web Audio API and synchronized with the help of Tone.js. A row of wildcard buttons add extra excitement with chainable audio effects and assorted samples. 

Using the looping sequencer, users can create their own beats live!

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/1.png">
</p>

## Technologies 
- Web Audio API (for sound synthesis)
- Tone.js (for synchronization and effects)
- Canvas (for audio visualization)
- React
- HTML
- CSS 

## Features
-  Interactive step sequencer
-  Looping for live beat creation
-  Drum sound synthesis 
-  Live audio visualizer with multiple modes 
-  Audio effects (bitcrusher, chorus, wah-wah, delay)
-  Samples for ambience (rain, city, synth drone)
-  Selectable color schemes 
-  Tempo Control 
-  Volume Control

Once you load up the sequencer by pressing Start, you are greeted with a 4x16 grid of buttons. Each row represents a different sound, and each column represents a step in the sequencer.

When the sequencer is playing, it continuously loops over the steps at the selected tempo. At each step, it triggers any selected sounds to play. 

The audio-visualizer allows you to see a visual representation of your musical creation!

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/2.png">
</p>

If you want to make things more interesting, you can active some wildcard buttons from the middle panel. These buttons trigger all sorts of unexpected effects! Some of them are short audio samples, others are looping ambient noise tracks, and others are audio effects. The icons are intentionally vague... Just press them and listen to what happens!

By combining certain wildcards, you can create interesting soundscapes without even using the sequencer! 

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/3.png">
</p>

One of the most fun features of the Electron Aligner is the ability to directly control the synthesis of the drum sounds. There are three parameters that you can control for each of the four sounds: volume, tone, and decay.

The volume slider is really easy to understand - it controls the maximum amplitude of the sound. 

The tone slider controls the frequency center of the sound, resulting in a higher or lower pitch. 

You can visualize these two parameters with this image:

<p align="center">
  <img src="https://www.ducksters.com/science/physics/wave_amplitude_wavelength.gif">
</p>

The last slider gives you control over the decay, or how long the sound is heard before silence. 

With just these three controls, there are a ton of fun musical possibilites!

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/controls.png">
</p>

Each of the controllable sounds (as well as the wildcard samples) are routed into the effects, then to the master volume, then to the audio analyzer, and then to the output. This makes up the signal flow of the Electron Aligner. 

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/signal_flow.png">
</p>

In the code, that's just a chain of connections: 

```js
//all of the sounds are connected to this.effects

this.effects.connect(this.bitCrusher.input);
this.bitCrusher.connect(this.chorus.input);
this.chorus.connect(this.wah.input);
this.wah.connect(this.pingPong.input);
this.pingPong.connect(this.masterVolume);
this.masterVolume.connect(this.analyser);
this.analyser.connect(context.destination);

//the context.destination is your speakers!
```

There are several options to customize the presentation, including multiple color schemes as well as an alternate audio visualizer mode. 

<p align="center">
  <img src="https://github.com/eliraybon/ElectronAligner/blob/master/public/assets/readme/4.png">
</p>

