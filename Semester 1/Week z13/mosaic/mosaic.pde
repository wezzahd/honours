
int numOfImages = 17;
ArrayList<PImage> images = new ArrayList<PImage>(); //creates the array for the images
int tileHeight; //the height of a tile
int tileWidth; //the width of a tile
PImage mainPic;
boolean updated;

void setup() {
  size(700, 500);
  //fullScreen(P2D);
  tileHeight = 5;
  tileWidth = 5;
  loadMain();
}

void draw() {
  isUpdated();
  if (updated) {
    loadMain();
    updated = false;
  }
}

//checks to see if the program has been updated
void isUpdated() {
  if (mousePressed && (mouseButton == LEFT)) {
    tileHeight += 5;
    tileWidth += 5;
    updated = true;
  } 
  else if (mousePressed && (mouseButton == RIGHT) && (tileHeight > 1)) {
    tileHeight -= 5;
    tileWidth -= 5;
    updated = true;
  } 
}

//loads the main image with the super pixels replaced by the smaller images
void loadMain() {
  images.clear();
  mainPic = loadImage("black-hole-photo.jpg");
  mainPic.resize(width, height);
  for (int i = 0; i < numOfImages; i++) {
    PImage cur = loadImage("photos1/files00" + i + ".jpg" ); //loads the images into the array
    cur.resize(tileWidth, tileHeight); //resizes all images to the proper dimensions
    images.add(cur);
    images.add(darken(cur, 1.5)); //adds a greater range of images to pick from
    images.add(darken(cur, .8));
  }
  for (int x = 0; x < width; x+=tileWidth) {
    for (int y = 0; y < height; y+=tileHeight) {
      PImage cur = mainPic.get(x, y, tileWidth, tileHeight);
      image(pickClosest(cur), x, y);
    }
  }
}

//this method takes an image and picks the image from images[] that
//is closest in average color
PImage pickClosest(PImage image) {
  int accumSum = distanceBetween(image, images.get(0));
  int closest = 0;
  for (int i = 1 ; i < images.size() ; i++) {
    int distSum = distanceBetween(image, images.get(i));
    if (distSum < accumSum) {
      closest = i;
      accumSum = distSum;
    }
  }
  return images.get(closest);
}

//calculates the distance between the colors of two images 
int distanceBetween(PImage i1, PImage i2) {
  float accumSum = 0;
  for (int i = 0; i < i1.pixels.length; i++) {
    accumSum += dist(red(i1.pixels[i]), green(i1.pixels[i]), blue(i1.pixels[i]), 
    red(i2.pixels[i]), green(i2.pixels[i]), blue(i2.pixels[i]));
  }
  return round(accumSum);
}

//darkens (or lightens if given a decimal factor) the pixels of the image
PImage darken(PImage in, float factor) {
  PImage out = createImage(in.width, in.height, RGB);
  for (int i = 0; i < in.width * in.height; i++) {
    out.pixels[i] = color(red(in.pixels[i])/factor, green(in.pixels[i])/factor, blue(in.pixels[i])/factor);
  }
  return out;
}
