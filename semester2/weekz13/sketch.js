var capture;
var text_dict;
var did_toggle = false;
var cnv;


// document.addEventListener('touchmove', function(event) {
//   if (event.scale !== 1) {
//     event.preventDefault();
//   }
// }, false);

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  cnv.style('display', 'block');
  capture = createCapture(VIDEO);
  capture.size(width,height);
  capture.hide();

let click = createP('CLICK HERE');

click.class("click");
click.style('position','absolute');
click.style('top', (height-120)+'px');


}

function draw() {
  background(220);

  image(capture,0,0, width,height);

}

function didactic() {


 text_dict = createDiv('Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to reset.  Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to reset');

text_dict.class("didatic");
text_dict.position(20, 20);
text_dict.size(width- 20, height - 100);

var $scrollableElement = document.querySelector('.didatic');
scrollLock.disablePageScroll($scrollableElement);
console.log($scrollableElement);
}


// function touchMoved(event) {
//   return false;
// }



function mousePressed(){

if (mouseY > height -100 && mouseY < height){

  did_toggle = !did_toggle;

  if (did_toggle == true){
    didactic();
  }else{
    text_dict.remove();
  }


}







}
