function centerCanvas() {

  inner = iosInnerHeight();
  var cnv_x = (windowWidth - width) / 2;
  var cnv_y = (inner - height) / 2;
  cnv.position(cnv_x, cnv_y);

}

function make2Darray(cols, rows) {
  var arr = new Array(rows);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}

function capturecam() {
  capture = createCapture(VIDEO, ready);
  capture.elt.setAttribute('playsinline', '');
  //capture.size(width, height);
  capture.hide();
}

function imageaspectratio(pg) {
  var aspectRatiow = width / capture.width;
   var aspectRatioh = height / capture.height;

   //console.log(aspectRatiow, aspectRatioh)




   pg.push();

    pg.translate(width,0);
     pg.scale(-1, 1);



   if (aspectRatiow > 1 && aspectRatioh < 1) {
     pg.translate(width/2,height/2);
     pg.scale(aspectRatiow);
     pg.imageMode(CENTER);
     pg.image(capture,0,0);
 }

 if (aspectRatiow < 1 && aspectRatioh > 1) {
   pg.translate(width/2,height/2);
   pg.scale(aspectRatioh);
   pg.imageMode(CENTER);
   pg.image(capture,0,0);
 }

 if (aspectRatiow > 1 && aspectRatioh > 1) {
   pg.translate(width/2,height/2);

if (aspectRatiow > aspectRatioh) {
    pg.scale(aspectRatiow);
  }else{
    pg.scale(aspectRatioh);
  }
    pg.imageMode(CENTER);
    pg.image(capture,0,0);
  }

 if (aspectRatiow <= 1 && aspectRatioh <= 1) {
   pg.imageMode(CENTER);
   pg.image(capture,width/2,height/2);
 }
 pg.pop();
}

function imageaspectratiomain(mainanimation) {
    var aspectRatiow = width / capture.width;
    var aspectRatioh = height / capture.height;



  //  console.log(aspectRatiow, aspectRatioh)

    mainanimation.push();

    mainanimation.translate(width,0);
    mainanimation.scale(-1, 1);



   if (aspectRatiow > 1 && aspectRatioh < 1) {
     mainanimation.translate(width/2,height/2);
     mainanimation.scale(aspectRatiow);
     mainanimation.imageMode(CENTER);
     mainanimation.image(capture,0,0);
 }

 if (aspectRatiow < 1 && aspectRatioh > 1) {
   mainanimation.translate(width/2,height/2);
  mainanimation.scale(aspectRatioh);
  mainanimation.imageMode(CENTER);
  mainanimation.image(capture,0,0);
 }

 if (aspectRatiow > 1 && aspectRatioh > 1) {
   mainanimation.translate(width/2,height/2);

if (aspectRatiow > aspectRatioh) {
  mainanimation.scale(aspectRatiow);
  }else{
  mainanimation.scale(aspectRatioh);
  }
  mainanimation.imageMode(CENTER);
  mainanimation.image(capture,0,0);
  }

 if (aspectRatiow <= 1 && aspectRatioh <= 1) {
  mainanimation.imageMode(CENTER);
  mainanimation.image(capture,width/2,height/2);
 }
mainanimation.pop();
}
