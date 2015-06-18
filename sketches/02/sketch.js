var modular;
var sources;

function preload() {
}

function setup() {
  modular = new p5.AudioIn();
}

function draw() {
  sources = modular.listSources();
  modular.setSource(sources.length - 1);
  console.log(sources);
}

function mousePressed() {
  noLoop();
}
