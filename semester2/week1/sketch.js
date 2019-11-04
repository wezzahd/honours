let ps;


let x = 0;
let y = 0;
let skip = 100; //48 iphone
let factor = 1.0;
let aspect = 9 / 16;

var img;
var first_frame = true;
var go = true;
var counter = 0;

var reset = false;

var cnv;

var LFO = false;

var isMobile = false; //initiate as false

var isAndroid = false;

var intersect_toggle = false;

var eraser_size;

var main_animation = true;

var loading_cap;

var pg;

var alpha_load = 0;

var loading_alpha = 100;

var trigger = false;

var counter = 0;

var ellipse_mouseX, ellipse_mouseY;

var fullscreen_button;

let bg;

var buttonx, buttony;

var instruction_toggle = false;

var inc = 0.01;
var flying = 0;
var flyingx = 0;
var aoff = 0;
var boff = 1;

 touchIsStarted = false;




document.addEventListener('touchmove', function(event) {
  if (event.scale !== 1) {
    event.preventDefault();
  }
}, false);



//p5.disableFriendlyErrors = true; // disables FES

function centerCanvas() {
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (windowHeight - height) / 2;
  cnv.position(cnv_x, cnv_y);
}

function preload() {

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }

}





function setup() {


  if (isMobile == false) {
    skip = 30;
    eraser_size = skip;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
  } else {
    skip =30;
    eraser_size = skip;
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');
  }


  pixelDensity(1);

  capture = createVideo("waves.mp4")//
  //capture = createCapture(VIDEO, ready);

//  capture.elt.setAttribute('playsinline', '');
   capture.size(width, height);
  capture.hide();
  capture.loop();
  capture.volume(0);

  let mouse = createVector();

  cols = width/skip;
  rows = height/skip;

  pg = createGraphics(width, height);
  pgnoise = createGraphics(int(width/skip), int(height/skip));



}

function ready() {
  go = true;
}


function loadingScreen() {

  pg.background(0);

  pg.noFill();
  //pg.stroke(255, alpha_load);
  //pg.rect(CENTER);

  if (frameCount < 90) {

    var ellsize = map(frameCount, 0, 90, eraser_size * 8, eraser_size * 2);
  } else {
    var ellsize = (eraser_size * 2);
  }

 pg.image(capture,0,0,width,height);

  buttonx = width/2;
    buttony = (height-(height/6));

  pg.fill(127,160);
  pg.noStroke()
  pg.ellipseMode(CENTER);
  pg.ellipse(buttonx,buttony, 90, 90);


  pg.fill(255);
  pg.noStroke()
  pg.ellipseMode(CENTER);
  pg.ellipse(buttonx,buttony, 65,65);


  if (instruction_toggle == false) {
  pg.noFill();
  pg.stroke(255)
  pg.rectMode(CENTER);
  pg.rect(40,40, 30,30);
  }else{
     pg.noStroke();
  pg.fill(255)
  pg.rectMode(CENTER);
  pg.rect(40,40, 30,30);
  }






  if (loading_alpha <= 0) {
    still();
    main_animation = true;
    trigger = false;
  }



  if (instruction_toggle == true) {
  instructions();
  }


  image(pg, 0, 0);


}


function instructions () {

  for (var m = 0; m < width; m += skip) {
        for (var n = 0; n < height; n += skip) {


          pg.noFill();
          pg.strokeWeight(.5);
  pg.stroke(255,127);
  pg.rectMode(CENTER);
  pg.rect(m,n, skip, skip);


        }
      }


  pg.noStroke();
  pg.fill(80,127);
  pg.rectMode(CENTER);
  pg.rect(width/2,height/2, width, height);





 pg.noStroke();
  pg.fill(255, loading_alpha);
  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
    pg.textSize(24);
  } else {
    pg.textSize(24);
  }


 pg.textFont("VT323");

  pg.noStroke();
  pg.fill(255, 255);

  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
    pg.text('click here for fullscreen', width / 2, (40));
  }

  if (isAndroid == true && width < height) {
    pg.text('click here for fullscreen', width / 2, (40));
  }

  if (isAndroid == true && height < width) {
    pg.text('click here for fullscreen', width / 2, (40));
  }


  pg.textAlign(CENTER, CENTER);


  if (isMobile == false) {

     pg.textSize(70);
     pg.text('m o s a i c', width / 2, height/3);

     pg.textSize(24);

    pg.text('click button to start', width / 2, (height -20));

    pg.text('use mouse to disperse pixels', width / 2, height/2);

  } else {

    pg.text('m o s a i c', width / 2, height/6);
    pg.text('tap button to start', width / 2, (height -20));
       pg.text('drag finger to disperse pixels', width / 2, height/3+20);

  }

  if (isMobile == false) {

    pg.text('click and hold mouse button', width / 2,  height/2 +40);
    pg.text('to reconstruct image', width / 2, height/2+60);

  } else {
    pg.text('two finger touch and hold', width / 2, (height - height/3)-40);
    pg.text('to reconstruct image', width / 2, (height - height/3)-20);

  }



}

function still() {

  bg = capture.get();
  //bg.filter(GRAY); //black and white
  bg.resize(width,height);
//  bg.scale(-1.0,1.0);
  captureEvent();
}


  function noisefly() {
    aoff = aoff + 0.001;
  let n = map(pgnoise.noise(aoff), 0,1, -0.0005, 0.0005);
  flying -= n;

 boff = boff + 0.001;

  let n2 = map(pgnoise.noise(boff), 0,1, -0.0007, 0.0007);
  flyingx -= n2;
  var yoff = flying;
  pgnoise.loadPixels();
  for (var y = 0; y < pgnoise.height; y ++) {
    var xoff = flyingx;
    for (var x = 0; x < pgnoise.width; x ++) {
      var index = (x + y * pgnoise.width) * 4;
      var r = pgnoise.noise(xoff*skip, yoff*skip)*  255;
      pgnoise.pixels[index + 0] = r;
      pgnoise.pixels[index + 1] = r;
      pgnoise.pixels[index + 2] = r;
      pgnoise.pixels[index + 3] = 200;
      xoff += inc;
    }
    yoff += inc;
  }
  pgnoise.updatePixels();
}







function captureEvent() {

  if (first_frame == true & go == true) {

    reset = false;
    capture.stop();

    ps = new ParticleSystem(createVector(width / 2, height / 2), img);

    if (isMobile == false) {

      var start_width = skip;
      var end_width = width-skip;
      var start_height = skip;
      var end_height = height-skip;

      for (var i = (start_width); i < (end_width); i += skip) {
        for (var j = start_height; j < (end_height); j += skip) {
          ps.addParticle((x + i) / factor, (y + j) / factor, 0, pgnoise);
          // ps.addParticle((x + i) / factor, (y + j) / factor, 1, capture);
          // ps.addParticle((x + i) / factor, (y + j) / factor, 2, capture);
        }
      }
    } else {


      var start_width = 0;
      var end_width = width;
      var start_height = 0;
      var end_height = height;


      for (var i = (start_width); i < (end_width); i += skip) {
        for (var j = start_height; j < (end_height); j += skip) {
          ps.addParticle((x + i) / factor, (y + j) / factor, 0, pgnoise);
        }
      }
    }
  }
}


function draw() {


  if (alpha_load < 200) {
    alpha_load = alpha_load + 1;

  }

  if (trigger == true) {
    loading_alpha = loading_alpha - 10.0;
    // trigger = false;
  }



  if (main_animation == false) {
    loadingScreen();
  } else {
  noisefly();
    webcam();
  }
}


function webcam() {


blendMode(BLEND);
  background(0,80,80);


  blendMode(ADD);

  for (var i = 0; i < touches.length; i++) {

    if (isMobile == true && touches.length == 0) {
      mouseIsPressed = false;
    }
    if (isMobile == true && touches.length >= 1) {
      mouseIsPressed = true;
    }

  }



 ps.run();
 ps.behaviors();



  // if (mouseIsPressed) {
  //   ps.return_home();
  // }
 }


function touchMoved(event) {
  return false;
}

function windowResized() {

  if (main_animation == true) {
pgnoise.clear();
    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
    pgnoise = createGraphics(int(width/skip), int(height/skip));
    still();
    //captureEvent();
  } else {
    pg.clear();

    resizeCanvas(windowWidth, windowHeight);
    centerCanvas();
    //loading_capture();
    pg = createGraphics(width, height);


    loadingScreen();
  }
}


function mousePressed() {

  if (mouseX > width/3 && mouseX < width -(width/3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
    let fs = fullscreen();
    fullscreen(!fs);
  }


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true ) {
    let fs = fullscreen();
    fullscreen(!fs);
  }

  // if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 30 && isAndroid == true && height < width) {
  //   let fs = fullscreen();
  //   fullscreen(!fs);
  // }

   if (mouseIsPressed == true && mouseX > (buttonx - 35) && mouseX < (buttonx + 35) && mouseY > (buttony - 35) && mouseY < (buttony + 35)) {
    trigger = true;
  }

  if (mouseX > (50 - 25) && mouseX < (50 + 25) && mouseY > (50 - 25) && mouseY < (50 + 25)) {

    instruction_toggle = !instruction_toggle;
  }


}
