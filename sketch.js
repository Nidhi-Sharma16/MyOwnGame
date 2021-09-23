var form,level2;
var canvas;
var car1,fuels,powerCoins,obstacles;
var gameState=2;
function preload() {
  backgroundImage = loadImage("./assets/background.png");
  car1_img = loadImage("../assets/car1.png");
  car2_img = loadImage("../assets/car2.png");
  track = loadImage("../assets/track.jpg");
  fuelImage = loadImage("./assets/fuel.png");
  powerCoinImage = loadImage("./assets/goldCoin.png");
  obstacle1Image = loadImage("./assets/obstacle1.png");
  obstacle2Image = loadImage("./assets/obstacle2.png");
  lifeImage = loadImage("./assets/life.png");
  blastImg = loadImage("./assets/blast.png");
}

function setup(){
    canvas = createCanvas(1000,500);
    //form=new Form();
    //background("orange");
    //level2 = new Level2();
    level3 = new Level3();
    level3.start();
}
function draw(){
  // form.display();
    //level2.display();
    // if(gameState===2){
    //   level3.display();
    // }
}

