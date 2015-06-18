var movers = new Array(5);

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  for (var i = 0; i < movers.length; i++) {
    movers[i] = new Mover();
  }
}

function draw() {
  for (var i = 0; i < movers.length; i++) {
    movers[i].update();
    movers[i].checkEdges();
    movers[i].display();
  }
}

/**
 * Add 5 more
 */
function mousePressed() {
  for (var i = 0; i < 5; i++) {
    movers.push(new Mover());
  }
}

/**
 * The mover class
 * @constructor
 */
function Mover() {
  this.location = new p5.Vector(random(windowWidth), random(windowHeight));
  this.velocity = new p5.Vector(0, 0);
  this.acceleration = null;
  this.mouse = null;
  this.dir = null;
  this.topspeed = 4;
  this.width = random(4, 20);
  this.height = this.width;
  this.r = random(255);
  this.g = random(255);
  this.b = random(255);
}

Mover.prototype.update = function() {
  this.mouse = new p5.Vector(mouseX, mouseY);
  this.dir = p5.Vector.sub(this.mouse, this.location);

  this.dir.normalize();
  this.dir.mult(0.5);
  this.acceleration = this.dir;

  this.velocity.add(this.acceleration);

  this.calculateTopspeed();

  this.velocity.limit(this.topspeed);

  this.location.add(this.velocity);
};

Mover.prototype.display = function() {
  stroke(0);
  fill(this.r, this.g, this.b);
  ellipse(this.location.x, this.location.y, this.width, this.height);
};

Mover.prototype.calculateTopspeed = function() {
  var distance = this.location.dist(this.mouse);
  console.log(distance);

  if (distance > 1000) {
    this.topspeed = 10;
  } else if (distance > 500) {
    this.topspeed = 7;
  } else if (distance > 250) {
    this.topspeed = 5;
  } else if (distance > 125) {
    this.topspeed = 3;
  } else if (distance > 62.5) {
    this.topspeed = 2;
  } else {
    this.topspeed = 0.5;
  }
};

Mover.prototype.checkEdges = function() {
  if (this.location.x > windowWidth) {
    this.location.x = 0;
  } else if (this.location.x < 0) {
    this.location.x = windowWidth;
  }

  if (this.location.y > windowHeight) {
    this.location.y = 0;
  } else if (this.location.y < 0) {
    this.location.y = windowHeight;
  }
};
