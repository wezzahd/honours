class Particle {
  constructor(x, y) {
    this.pos = createVector(x,y);
    this.rgbVel = createVector(0, 0, 0);
    this.rgbAcc = createVector(0, 0, 0);
    this.hsb = createVector(360,100,50); // hue
    this.rgb = createVector(0,0,0);
    this.rgborig = this.rgb.copy();
    this.noisergb = createVector(0,0,0);

    this.size = skip;
    this.sizerr = 1;
    this.alpha = 255;
    this.slice = int(random(numberOfSlices)) * sliceDistance;
    this.col = color(0,0,0);
    this.maxspeed = 0.4;
    this.maxforce = 0.01;
    this.value = 1;
    this.gohome = gohome;
  }

  setToColor(r, g, b) {

    if (init == 0) {
    this.rgb.set(r, g, b);
    this.rgborig = this.rgb.copy();
    this.hsb.set(random(360),100,50);

  }else{
    //this.rgb.set(r, g, b);
    this.rgborig.set(r, g, b);
    //this.hsb.set(random(360),100,50);
  }
  }

  behaviours() {
  if (gohome == false) {
    var getnoisy = this.seek(this.noisergb);
    this.applyForce(getnoisy);
  }else{
    var rgborig = this.seek(this.rgborig);
    this.applyForce(rgborig);
    var rgborig_arrive = this.arrive(this.rgborig);
    this.applyForce(rgborig_arrive);

    let d = dist(this.rgb.x,this.rgb.y,this.rgb.z, this.rgborig.x, this.rgborig.y,this.rgborig.z);
//console.log(d);

    if (d <= 1.0 && this.gohome == true ){
     //goHome();
     this.value = 0;
      }else{
        this.value = 1;
      }
    }
}

    partvalue() {
      var pvalue = this.value;
      return pvalue;
    }

    update() {
      this.rgbVel.add(this.rgbAcc);
      this.rgbVel.limit(this.maxspeed);
      this.rgb.add(this.rgbVel);
      this.rgbAcc.mult(0);
      this.gohome = gohome;
    }

    applyForce(force) {
      this.rgbAcc.add(force);
    }

    calculateForce() {
      var force = calculateForce(this.pos.x,this.pos.y,this.slice);
      this.sizerr = constrain(map(force,0.3,0.7,0,3),0.1,3);
      this.alpha = map(force,0,1,10,200);
      this.setHue(force * hueMultiplier);

      if (counter < countermax && gohome == false) {
        //this.lerper = 0;
        this.sizerr = lerp(1.0,this.sizerr,lerper);
        this.alpha = lerp(255,this.alpha,lerper);
        }

      if (gohome == true) {
        //this.lerper = 0;
        this.sizerr = lerp(1.0,this.sizerr,lerper);
        this.alpha = lerp(255,this.alpha,lerper);
        //this.sizerr = lerp(this.sizerr,1.0,lerper);
        //this.alpha = lerp(this.alpha,255,lerper);
        }

    }

   setHue(force) {
      if (force > 360) {
              this.hsb.x = force % 361;
        } else {
              this.hsb.x = force;
        }

      this.HSBtoRGB();

    }

HSBtoRGB() {
  this.hsbcolor = tinycolor({ h: this.hsb.x, s: 1, l: .5 });
  this.rgbcolor =  this.hsbcolor.toRgb(); // { r: 255, g: 0, b: 0, a: 1 }
  this.rgbarray = (Object.values(this.rgbcolor));
  this.noisergb = createVector(this.rgbarray[0],this.rgbarray[1],this.rgbarray[2]);
}

seek(target) {
  var desired = p5.Vector.sub(target, this.rgb);
  desired.normalize();
  desired.mult(this.maxspeed);
  var steer = p5.Vector.sub(desired, this.rgbVel);
  steer.limit(this.maxforce);
  return steer;
}

arrive(target) {
    let desired = p5.Vector.sub(target, this.rgb); // A vector pointing from the location to the target
    let d = desired.mag();
    // Scale with arbitrary damping within 10 pixels
    if (d < 10) {
      var m = map(d, 0, 100, 0, this.maxspeed);
      desired.setMag(m);
    } else {
      desired.setMag(this.maxspeed);
    }

    // Steering = Desired minus Velocity
    let steer = p5.Vector.sub(desired, this.rgbVel);
    steer.limit(this.maxforce);  // Limit to maximum steering force
    return steer;
  }



  display() {
      //RED

      push();
      stroke(this.rgb.x, 0,0,this.alpha);
      fill(this.rgb.x, 0,0,this.alpha);
      rectMode(CENTER);
//       //rect(this.position.x,this.position.y,this.size,this.size);
      rect(this.pos.x+(this.size/3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);

//       //GREEN
      stroke(0, this.rgb.y,0,this.alpha);
      fill(0, this.rgb.y,0,this.alpha);
      rectMode(CENTER);
//      //rect(this.position.x,this.position.y,this.size,this.size);
      rect(this.pos.x+(this.size/3*2), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);

// //       //BLUE
       stroke(0, 0, this.rgb.z,this.alpha);
       fill(0, 0, this.rgb.z,this.alpha);
       rectMode(CENTER);
//     //  rect(this.position.x,this.position.y,this.size,this.size);
      rect(this.pos.x+(this.size/3*3), this.pos.y, (this.size/3)*this.sizerr, this.size * this.sizerr);
      pop();

    }
}
