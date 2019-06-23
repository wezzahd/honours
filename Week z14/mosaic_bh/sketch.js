let ps;

let x = 0;
let y = 0;
let skip = 50;
let factor = 1;

var img;
var first_frame = true;
var go = true;
var counter = 0;
var screen


var eraser_size = 30;

p5.disableFriendlyErrors = true; // disables FES

function preload() {
  capture = loadImage("mosaic.png");

}




function setup() {
  cnv = createCanvas(1280, 720);
  //cnv = createCanvas(displayWidth, displayHeight);
  //cnv = fullScreen();
  pixelDensity(1);
  //capture = createCapture(VIDEO, ready);
  ps = new ParticleSystem(createVector(width / 2, 50), img);
  //capture.elt.setAttribute('playsinline', '');
  //capture.size(width, height);
  //capture.hide();
  img = createImage(width, height);
  //screen = createImage(width, height);
  noCursor();
}

function ready() {
  go = true;
}

function windowResized() {
  if (windowWidth < 414 || windowHeight < 414) {
    resizeCanvas(windowWidth, windowHeight);
  }
}

function captureEvent() {

  if (first_frame == true & go == true) {

    //img = capture.get();
    first_frame = false;

    var square = int(width / 3);
    var square_no = int(width - (width / 3));

    for (var i = 200; i < width-200; i += skip) {
      for (var j = 0; j < height; j += skip) {

        ps.addParticle((x + i) / factor, (y + j) / factor, 0, capture);
        // ps.addParticle((x+i+(skip/3))/factor, (y+j)/factor, 1, capture);
        // ps.addParticle((x+i+(skip/3*2))/factor, (y+j)/factor, 2, capture);
      }
    }
  }
}

function draw() {
  blendMode(BLEND);
  background(0);
  blendMode(ADD);

  if (counter == 250) {
    captureEvent();
  }
  if (counter > 250 && counter < 290) {
    ps.return_home();
  }
  if (counter < 300) {
    counter = counter + 1;
  }

  ps.run();
  // ps.intersection();
  ps.behaviors();
  //image(screen,0,0);


  if (mouseIsPressed) {

    ps.return_home();
  }
//image(capture,0,0);
  stroke(255);
  noFill();
  ellipse(mouseX, mouseY, eraser_size * 2, eraser_size * 2);
}
