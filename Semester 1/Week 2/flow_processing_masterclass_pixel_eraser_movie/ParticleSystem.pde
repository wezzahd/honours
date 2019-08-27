

class ParticleSystem {
  ArrayList<Particle> particles;
  PImage img;

  ParticleSystem(PVector position, PImage img_) {
    particles = new ArrayList<Particle>();
    img = img_;
  }

  void addParticle(float x, float y, int rand, PImage img) {
    particles.add(new Particle(x, y, rand, img));
  }


  void display() {
    for (Particle p : particles) {
      p.display();
    }
  }

  void intersection() {
    for (Particle p : particles) {
      p.intersects(particles);
    }
  }

 void behaviours() {
    for (Particle p : particles) {
      p.behaviours();
    }
  }




  // A function to apply a force to all Particles
  void applyForce(PVector f) {
    for (Particle p : particles) {
      p.applyForce(f);
    }
  }
  void return_home() {
    for (Particle p : particles) {

      p.velocity.x = 0.0;//map(d,0,200,0.5,0.1)*(p.position.x - x);
      p.velocity.y = 0.0;//map(d,0,200,0.5,0.1)*(p.position.y - y);
      p.acceleration.x = -0.1*(p.position.x - p.home.x);
      p.acceleration.y = -0.1*(p.position.y - p.home.y);


      //p.fill_alpha = 255;
      //if (p.position.x == p.home.x && p.position.y == p.home.y) {
      //  p.fill_alpha = 255;
      //}
    }
  }

void applyRepeller(Repeller r) {
    for (Particle p : particles) {
      PVector force = r.repel(p);        
      p.applyForce(force);
    }
  }

  void update() {
    for (int i = particles.size()-1; i >= 0; i--) {
      Particle p = particles.get(i);
      p.update();
      if (p.isDead()) {
        particles.remove(i);
      }
    }
  }
}