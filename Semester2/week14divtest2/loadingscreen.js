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

  pg.push();
  pg.noStroke();
  pg.fill(255,150);
  pg.rectMode(CENTER);
  pg.rect(width/2,height/2, width, height);


  if (instruction_toggle == true) {

 if (isMobile == true && width < height){
   pg.image(close, width-40, 50, 30, 30);
      }else{
        pg.image(close, width-40, 30, 30, 30);
}
  }

  if (isMobile == false) {
    pg.textSize(14);
  } else {
    pg.textSize(12);
  }


  pg.textFont("Roboto Mono");

  pg.noStroke();
  pg.fill(0, 255);

  pg.textAlign(CENTER, CENTER);

  if (isMobile == false) {
    pg.text('click here for fullscreen', width / 2, (40));
  }

  if (isAndroid == true && width < height) {
    pg.text('click here for fullscreen', width / 2, (60));
  }

  if (isAndroid == true && height < width) {
    pg.text('click here for fullscreen', width / 2, (40));
  }


  if (isMobile == false) {

    pg.textAlign(LEFT, LEFT);

    pg.fill(0);
     pg.textSize(24);
     pg.text('Code, 2019', 70, height/4 );
     pg.textSize(24);

     if (isMobile == false && mouseY > height/4 + 20  && mouseY < height/4 + 40  && mouseX < 300 ) {
       pg.fill(0,0,205);
     }else{
       pg.fill(100,149,237);
     }

     pg.text('Wesley Dowling', 70, height/4 + 30);
     pg.fill(0);
     pg.textSize(14);

     pg.rectMode(CORNER);
     var s = 'Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: mouse click to reset'

     pg.text(s, 70, height/4+70, width- 70, height - 140);


     pg.textAlign(CENTER, CENTER);
     pg.textSize(14);
     pg.text('click button to start', width / 2, (height  - 20));



  } else {


      pg.textAlign(LEFT, LEFT);

      pg.fill(0);
     pg.textSize(18);
     pg.text('Code, 2019', 20, height/6);


     if (isMobile == true && mouseY > height/6 + 10  && mouseY < height/6 + 30 &&  mouseX < 300) {
pg.textSize(18);
       pg.fill(0,0,205);
        pg.text('Wesley Dowling', 20, height/6 + 20);
     }else{
       pg.textSize(18);
       pg.fill(100,149,237);
        pg.text('Wesley Dowling', 20, height/6 + 20);
     }


pg.fill(0);
     pg.textSize(10);

     pg.rectMode(CORNER);
     var s = 'Code is an online generative work by Wesley Dowling that fragments and transforms photographs into flowing colour. Face detection algorithms capture the viewers image as an RGB subpixel array. The image is then sampled to initialize and produce an ever-changing generative colour field. The work occupies a liminal queer space that oscillates between states of photographic representation and abstraction.  The shifting composition is an outcome of research into how queering can be used to identify and subvert normative ideological assumptions in computational image making. Queering is used as a mode of resistance to scrutiny and surveillance by distorting the camera’s visual taxonomies through which people are recognized and regulated. The work undermines visual recognition to find a more open and variable mode of rendering that disrupts societal norms and essentialized notions of identity.\nInstructions: tap to reset';

     pg.text(s, 20, height/6+50, width- 20, height - 130);



     pg.textAlign(CENTER, CENTER);
     pg.textSize(12);
     pg.text('tap button to start', width / 2, (height  - 20));


  }

pg.pop();

}
