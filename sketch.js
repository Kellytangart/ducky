let variablename = 40;
let mic;
let micLevel;
var xPos = 0;
let bubble1;
let bubble2;
let angle = 0;
let bgColor;
var circles = [];

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  bgColor = random(255);
  mic = new p5.AudioIn();
  // mic.start();
  noFill();
  strokeWeight(2);
  stroke(color(random(255), random(255), 255));
  for (var i = 0; i < 15; i++) {
    var j = random(width);
    var k = random(height);
    var l = random(50, 50);
    var m = color(random(255), random(255), 255);
    var s = random(0.6, 3);
    circles[i] = new DrawCircle(j, k, l, m, s);
  }
}


function draw() {
  background(bgColor);
  // console.log("mic level" + mic.getLevel);
  if (mouseIsPressed) {
    bgColor = color(random(255), random(255), random(255));
  }


  noStroke();
  fill('yellow')
  ellipse(200, 200, 250, 250)

  micLevel = mic.getLevel();

  let y = height - micLevel * height;
  fill('red');
  ellipse(200, y - 200, 200, 200);


  drawglasses();
  drawbeak(color);
  draweyes(color);
  drawTriangles();
  drawCheek(color);
  drawHat(color);


  for (var i = 0; i < circles.length; i++) {
    circles[i].move();
    circles[i].display();
  }

  // keep the number of circles on the canvas under 60
  if (circles.length > 60) {
    circles.shift();
  }

}

function drawbeak() {
  //BEAK
  fill('orange')
  ellipse(200, 235, 120, 60);
}

function draweyes() {
  //EYES
  fill('black')
  ellipse(250, 190, 20, 20)
  ellipse(150, 190, 20, 20)
  push();
  rect(133, 165, 30, 9)
  pop();
  push();
  rect(235, 165, 30, 8)
  pop();

}


function drawCheek() {
  //CHEEK
  fill('pink')
  ellipse(120, 200, 40, 20)
  ellipse(280, 200, 40, 20)
}

function drawHat() {
  //HAT
  push();
  r = random(1255); // r is a random number between 0 - 255
  g = random(110, 200);
  b = random(15); // b is a random number between 0 - 100
  a = random(200, 155); // a is a random number between 200 - 255
  fill('pink')
  triangle(140, 90, 300, 120, 250, 25)
  fill(r, g, b, a);
  ellipse(250, 20, 40, 40);
  pop();
}

function drawTriangles() {
  //TRIANGLE
  push();
  noFill();
  strokeWeight(4);
  stroke('lavender');
  triangle(30, 75, 58, 20, 86, 95);
  triangle(55, 365, 120, 360, 86, 300);
  triangle(355, 285, 380, 360, 276, 320);
  triangle(330, 90, 358, 20, 390, 75);
  pop();
}

function drawglasses() {
  push();
  noFill();
  strokeWeight(4);
  stroke('lavender');
  line(180, mouseY, 220, mouseY);
  ellipse(250, mouseY, 60);
  ellipse(150, mouseY, 60);
  pop();
}

function mousePressed() {
  var l = random(15, 15);
  var m = color(255);
  var s = random(0.2, 3);
  var newCircle = new
  DrawCircle(mouseX, mouseY, l, m, s);
  circles.push(newCircle);
}

function DrawCircle(j, k, l, m, s) {
  // declare the properties
  this.xPos = j;
  this.yPos = k;
  this.diameter = l;
  this.color = m;
  this.speed = s;
}

DrawCircle.prototype = {
  constructor: DrawCircle,
  display: function() {
    fill(this.color);
    ellipse(this.xPos, this.yPos, this.diameter, this.diameter);
  },

  move: function() {
    this.yPos += this.speed;
    if (this.yPos - this.diameter / 2 > height) {
      this.yPos = -this.diameter / 2;
    }
  }
}