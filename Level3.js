class Level3 {
  constructor() {
    this.leadeboardTitle = createElement("h2");
    this.leader1 = createElement("h2");
    this.playerMoving = false;
    this.leftKeyActive = false;
    this.blast = false;
  }

  start() {

    car1 = createSprite(400,height-100,width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;
    car1.addImage("blast",blastImg);

    fuels = new Group();
    powerCoins = new Group();

    obstacles = new Group();

    var obstaclesPositions = [
      { x: width / 2 + 250, y: height - 800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 1300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 1800, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 2300, image: obstacle2Image },
      { x: width / 2, y: height - 2800, image: obstacle2Image },
      { x: width / 2 - 180, y: height - 3300, image: obstacle1Image },
      { x: width / 2 + 180, y: height - 3300, image: obstacle2Image },
      { x: width / 2 + 250, y: height - 3800, image: obstacle2Image },
      { x: width / 2 - 150, y: height - 4300, image: obstacle1Image },
      { x: width / 2 + 250, y: height - 4800, image: obstacle2Image },
      { x: width / 2, y: height - 5300, image: obstacle1Image },
      { x: width / 2 - 180, y: height - 5500, image: obstacle2Image }
    ];

    // Adding fuel sprite in the game
    this.addSprites(fuels, 4, fuelImage, 0.02);

    // Adding coin sprite in the game
    this.addSprites(powerCoins, 18, powerCoinImage, 0.09);

    //Adding obstacles sprite in the game
    this.addSprites(
      obstacles,
      obstaclesPositions.length,
      obstacle1Image,
      0.04,
      obstaclesPositions
    );
  }

  addSprites(spriteGroup, numberOfSprites, spriteImage, scale, positions = []) {
    for (var i = 0; i < numberOfSprites; i++) {
      var x, y;

      //C41 //SA
      if (positions.length > 0) {
        x = positions[i].x;
        y = positions[i].y;
        spriteImage = positions[i].image;
      } else {
        x = random(width / 2 + 150, width / 2 - 150);
        y = random(-height * 4.5, height - 400);
      }
      var sprite = createSprite(x, y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements() {
    this.leadeboardTitle.html("Leaderboard");
    this.leadeboardTitle.position(width / 3 - 60, 40);

    this.leader1.class("leadersText");
    this.leader1.position(width / 3 - 50, 80);
  }

  display() {
    this.handleElements();

      image(track, 0, -height * 5, width, height * 6);

      //this.showFuelBar();
      //this.showLife();
     // this.showLeaderboard();
      var index = 0;
        //use data form the database to display the cars in x and y direction
        var x = 400;
        var y = height - 100;

        //var currentLife = life;
        // if(currentLife<=0){
        //   cars[0].changeImage("blast");
        //   cars[0].scale=0.3;
        // }
          stroke(10);
          fill("red");
          ellipse(x, y, 60, 60);

          this.handleFuel(index);
          this.handlePowerCoins(index);
          this.handleObstacleCollision(index);
          // if(player.life<=0){
          //   this.blast = true;
          //   this.playerMoving = false;
          // }
          // Changing camera position in y direction
          camera.position.y = car1.position.y;

      if (this.playerMoving) {
        car1.positionY += 5;
        car2.update();
      }

      // handling keyboard events
      this.handlePlayerControls();

      // Finshing Line
      const finshLine = height * 6 - 100;

      if (car1.positionY > finshLine) {
        gameState = 2;
        this.showRank();
      }

      drawSprites();
  }

  showLife() {
    push();
    image(lifeImage, width / 2 - 130, height - car1.positionY - 400, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - car1.positionY - 400, 185, 20);
    fill("#f50057");
    rect(width / 2 - 100, height - car1.positionY - 400, car1.life, 20);
    noStroke();
    pop();
  }

  showFuelBar() {
    push();
    image(fuelImage, width / 2 - 130, height - car1.positionY - 350, 20, 20);
    fill("white");
    rect(width / 2 - 100, height - car1.positionY - 350, 185, 20);
    fill("#ffc400");
    rect(width / 2 - 100, height - car1.positionY - 350, car1.fuel, 20);
    noStroke();
    pop();
  }

  handlePlayerControls() {

    
    if (keyIsDown(UP_ARROW)) {
      this.playerMoving = true;
      car1.positionY += 10;
    }

    if (keyIsDown(LEFT_ARROW) && car1.positionX > width / 3 - 50) {
      this.leftKeyActive = true;
      car1.positionX -= 5;
    }

    if (keyIsDown(RIGHT_ARROW) && car1.positionX < width / 2 + 300) {
      this.leftKeyActive = false;
      car1.positionX += 5;
    }
  }
  handleFuel(index) {
    car1.overlap(fuels, function(collector, collected) {
        car1.fuel = 185;
      collected.remove();
    });

    if (car1.fuel > 0 && this.playerMoving) {
        car1.fuel -= 0.3;
    }

    if (car1.fuel <= 0) {
      gameState = 2;
      this.gameOver();
    }
  }

  handlePowerCoins(index) {
    car1.overlap(powerCoins, function(collector, collected) {
        car1.score += 21;
      collected.remove();
    });
  }

  handleObstacleCollision(index) {
    if (car1.collide(obstacles)) {
      if (this.leftKeyActive) {
        car1.positionX += 100;
      } else {
        car1.positionX -= 100;
      }
      if (car1.life > 0) {
        car1.life -= 185 / 4;
      }
    }
  }

  showRank() {
    swal({
      title: `Awesome!${"\n"}Rank${"\n"}${player.rank}`,
      text: "You reached the finish line successfully",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText: "Ok"
    });
  }

  gameOver() {
    swal({
      title: `Game Over`,
      text: "Oops you lost the race....!!!",
      imageUrl:
        "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "Thanks For Playing"
    });
  }
  end(){
    console.log("gameOver")
  }
}
