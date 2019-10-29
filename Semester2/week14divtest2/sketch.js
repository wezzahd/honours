var ready;
var cols,rows;
var isMobile = false;
let capture;
var cnv;

var isAndroid = false;
var intersect_toggle = false;
var main_animation = false;
var loading_cap;
var pg;
var fullscreen_button;
let bg;
var buttonx, buttony;
var instruction_toggle = false;
var gohome = false;
var reset = false;
var counter = 0;
var countermax = 1000; //update
var lerper = 0;
var inner;
var reset = false;
var lfotri = 0;
var genderhue;

var mousetimer = false;

var facedet_inputsize = 320;


var init = 0; //camera shutter init

var mainanimation;

var scl = 0.001; // scale of noisefield, [+/-] to zoom in/out

var numberOfSlices = 5; // number of slices in noise space (along z-axis)

var skip = 30;

// position in noise field
var zMove = 0.0;
var xMove = 0.0;
var yMove = 0.0;

var particles; // array for particles
var timeLastFrame = 0.0;

const sclMultiplier = 1.2; // [+/-] divide/multiply scl by this to zoom in/out

// movement per second
const xSpeed = 0.0008;
const ySpeed = 0.01;
const zSpeed = 0.05;

const sliceDistance = 0.005;
const maxspeed = 6;
const hueMultiplier = 600;//500.0;
const accMultiplier = 8 * Math.PI;

let updateDetectRunning = false;
let facedetected = false;

var va = 1;
var count = 0;

var pixel, info, close;

var text_dict;
let inst_button;
let fullscr;
let inst;

// document.addEventListener('touchmove', function(event) {
//   if (event.scale !== 1) {
//     event.preventDefault();
//   }
// }, false);


function preload() {

  pixel = loadImage("/assets/pixel.png");
  info = loadImage("/assets/info.png");
  close = loadImage("/assets/close.png");

  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
    isMobile = true;
  }

  if (/android/i.test(navigator.userAgent)) {
    isAndroid = true;
  }
preload_facedetection();
}

function setup() {

  if (isMobile == false) {
    skip = 30;//50; //30 if not running facedetection
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('mycanvas');
    cnv.style('display', 'block');
  } else {
    skip = 20;
      if (windowWidth < windowHeight){
        inner = iosInnerHeight();
        cnv = createCanvas(windowWidth, inner);
        cnv.id('mycanvas');
        cnv.style('display', 'block');
        console.log("portrait")
  }else {
    cnv = createCanvas(windowWidth, windowHeight);
    cnv.id('mycanvas');
    cnv.style('display', 'block');
     console.log("landscape")
}
  }

capturecam();
pixelDensity(1);
pg = createGraphics(width, height);

}

function draw() {

//updateDetections();

//console.log(frameRate());

if( updateDetectRunning == false){
  background(0);
  textSize(14);
  fill(255);
  push();
  imageMode(CENTER);
  image(pixel,width/2,height/2,skip,skip);
  pop();
  textAlign(CENTER,CENTER);
  textFont("Roboto Mono");
  text("loading",width/2,height/2+ 30);
  updateDetections();
  }


 if (main_animation == true && counter == (countermax -1)) {
   updateDetections();
   //mousetimer = false;
}

if (main_animation == true && counter == (countermax - 20)) {
  mousetimer = false;
}

if (main_animation == true && facedetected == true && init >= 1 && mousetimer == false) { //add spacing between mouse and facedetection events
  camerashutter();
  console.log('click');
  facedetected = false;
}

if( updateDetectRunning == true){
  if (main_animation == false) {
    //updateDetections();
    loadingScreen();

  } else {
    noiseDraw();
  }
}

//console.log('camerashutter ' +init);
//console.log("counter " +counter)


}

function windowResized() {

  if (isMobile == true) {

  if (main_animation == true) {
    inner = iosInnerHeight();
    resizeCanvas(windowWidth, inner);
    //capturecam();
    centerCanvas();
    noiseSetup();
    setTimeout(getColour, 1000);
  } else {
    pg.clear();
    inner = iosInnerHeight();
    resizeCanvas(windowWidth, inner);
    //capturecam();
    centerCanvas();
    pg = createGraphics(width, height);
    loadingScreen();
      text_dict.size(width- 20, height/2);
    inst_button.style('top', (height-70)+'px');

  }
}else{
  //if (isMobile ==false &&
    if (main_animation == true) {
    resizeCanvas(windowWidth, windowHeight);
    noiseSetup();
    setTimeout(getColour, 1000);
    } else {
    pg.clear();
    resizeCanvas(windowWidth, windowHeight);
    pg = createGraphics(width, height);
    loadingScreen();
    text_dict.size(width- 20, height - (height/4));
  inst_button.style('top', (height-70)+'px');
}
 }
}
//
// function touchMoved(event) {
//   return false;
// }

function remove_elements(){
  text_dict.remove();
  link.remove();
  inst_button.remove();
  fullscr.remove();
  inst.remove();
}




function mousePressed() {


   if  (mouseX > (buttonx - 35) && mouseX < (buttonx + 35) && mouseY > (buttony - 35) && mouseY < (buttony + 35) && main_animation ==  false) {

     if (instruction_toggle == true){
       remove_elements();
     }

    noiseSetup();
     main_animation = true;
  }

    if (mouseX > width/3 && mouseX < width -(width/3) && mouseY > 0 && mouseY < 70 && isMobile == false) {
    let fs = fullscreen();
    fullscreen(!fs);
    //Remove vert scroll bar in fullScreen
     document.body.scrollTop = 0; // <-- pull the page back up to the top
    document.body.style.overflow = 'hidden';

  }


  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < 70 && isAndroid == true ) {
    let fs = fullscreen();
    fullscreen(!fs);

  }



  if (mouseX > (width-90) && mouseX < (width) && mouseY > 0 && mouseY < 90) {
    instruction_toggle = !instruction_toggle;
    if (instruction_toggle == true){
      instructions();
    }else{
      remove_elements();
    }
  }

  if (mouseX < width && mouseX > 0 && main_animation == true) {
    if (mouseY < height && mouseY > 0 && main_animation == true) {
  camerashutter();
  mousetimer = true;
    }
  }
}

function keyPressed() {

  if (key == 'h' || key == 'H') {

    goHome();
    console.log(gohome);
    console.log(reset);
  }else{

  }

  if (key == 'r' || key == 'R') {
    console.log("reset");
    for (y = 0; y < rows; y++) {
      for (x = 0; x < cols; x++) {
        blocks[y][x].randomizeColor();
      }
   }
}

}
