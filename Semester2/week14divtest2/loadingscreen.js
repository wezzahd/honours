function loadingScreen() {

  pg.background(0);

  pg.noFill();

  imageaspectratio(pg);

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
    if (isMobile == true && width < height){
      pg.image(info, width-40, 50, 30, 30);
        }else{
      pg.image(info, width-40, 30, 30, 30);
}
  }

  if (instruction_toggle == true) {
  instructions();
  }

  image(pg, 0, 0);
}


function instructions () {

  text_dict = createDiv('Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to reset.  Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to resetCode is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to reset');

  text_dict.class("didatic");
  text_dict.position(20, 20);
  text_dict.size(width- 20, height - 100);

  var $scrollableElement = document.querySelector('.didatic');
  scrollLock.disablePageScroll($scrollableElement);



}
