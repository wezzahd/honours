class ParticleSystem {
  constructor(position, img_) {
    this.origin = position.copy();
    this.particles = [];
  }

  addParticle(x, y, rand, img) {
    if (x !== undefined && y !== undefined) {
      this.particles.push(new Particle(x, y, rand, img));
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    // Run every particle
    // ES6 for..of loop
    for (let particle of this.particles) {
      particle.run();
    }

    // Filter removes any elements of the array that do not pass the test
    this.particles = this.particles.filter(particle => !particle.isDead());
  }

  // A function to apply a force to all Particles
  applyForce(f) {
    for (let particle of this.particles) {
      particle.applyForce(f);
    }
  }

  
  intersection() {

    let boundary = new Rectangle(0, 0, width, height);
    let qtree = new QuadTree(boundary, 4);

    for (let particle of this.particles) {
      let point = new Point(particle.position.x, particle.position.y, particle);
      qtree.insert(point);


      
      let range = new Rectangle(particle.position.x,particle.position.y,
     particle.size_v2/4, particle.size_v2/4);
      let points = qtree.query(range);

      for (let point of points) {
        let other = point.userData;

        
        if (particle !== other && particle.intersects(other)) {
          particle.intersectForce();
          
        }
      }
    }
  }


  behaviors() {
    for (let particle of this.particles) {
      particle.behaviors();
    }
  }



  return_home() {
    for (let particle of this.particles) {
      particle.velocity.x = 0.0; //map(d,0,200,0.5,0.1)*(p.position.x - x);
      particle.velocity.y = 0.0; //map(d,0,200,0.5,0.1)*(p.position.y - y);
      particle.acceleration.x = -0.1 * (particle.position.x - particle.home.x);
      particle.acceleration.y = -0.1 * (particle.position.y - particle.home.y);
			particle.gohome();
    }
  }


}