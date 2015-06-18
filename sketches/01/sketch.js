/*
 * We'll see
 */

'use strict';

var c, sound;
var fft;
var smoothing = 0.8; // play with this, between 0 and .99
var binCount = 1024; // size of resulting FFT array. Must be a power of 2 between 16 an 1024
var particles =  new Array(binCount);

function setup() {
  c = createCanvas(windowWidth, windowHeight);
  noStroke();

  sound = createAudio('../../music/Fatima-Yamaha_Whats_A_Girl_To_Do.mp3');
  sound.play();

  // initialize the FFT, plug in our variables for smoothing and binCount
  fft = new p5.FFT(smoothing, binCount);
  fft.setInput(sound);

  // instantiate the particles.
  for (var i = 0; i < particles.length; i++) {
    var x = map(i, 0, binCount, 0, width * 2);
    var y = random(0, height);
    var position = createVector(x, y);
    particles[i] = new Particle(position);
  }
}

function draw() {
  background(0, 0, 0, 100);

  // returns an array with [binCount] amplitude readings from lowest to highest frequencies
  var spectrum = fft.analyze(binCount);

  // update and draw all [binCount] particles!
  // Each particle gets a level that corresponds to
  // the level at one bin of the FFT spectrum. 
  // This level is like amplitude, often called "energy."
  // It will be a number between 0-255.
  for (var i = 0; i < binCount; i++) {
    var thisLevel = map(spectrum[i], 0, 255, 0, 1);

    // update values based on amplitude at this part of the frequency spectrum
    particles[i].update( thisLevel );

    // draw the particle
    particles[i].draw();

    // update x position (in case we change the bin count while live coding)
    particles[i].position.x = map(i, 0, binCount, 0, width * 2);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ===============
// Particle class
// ===============

var Particle = function(position) {
  this.position = position;
  this.scale = random(0, 1);
  this.speed = createVector(0, random(0, 10) );
  this.color = [random(0, 255), random(0,255), random(0,255)];
}

var theyExpand = 1;

// use FFT bin level to change speed and diameter
Particle.prototype.update = function(someLevel) {
  this.position.y += this.speed.y / (someLevel*2);
  if (this.position.y > height) {
    this.position.y = 0;
  }
  this.diameter = map(someLevel, 0, 1, 0, 100) * this.scale * theyExpand;
}

Particle.prototype.draw = function() {
  fill(this.color);
  ellipse(
    this.position.x, this.position.y,
    this.diameter, this.diameter
  );
}
