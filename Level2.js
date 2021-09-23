class Level2{
    constructor(){
        this.x = Math.round((1,50));
        this.y = Math.round(random(1,50));
        this.z = Math.round(random(1,50));
        this.question = createElement("h2");
        this.question.html("What is x-y*z ? Enter the answer in the box below.");
        this.input = createInput("").attribute("placeholder"," Enter Your Answer");
        this.submit = createButton("Submit");
    }

    setElementPosition(){
        this.question.position(250,300);
        this.input.position(400,370);
        this.submit.position(450,450);
    }

    hide(){
       this.question.hide(); 
        this.input.hide();
        this.submit.hide();
    }

    // string = " "
    //number
    //correctAns === answer , 405 === "405"
    //int - 0,10,4534,342323
    // float - 90.434,23.434
    //binary - 0,1 ex - 1100100010 ,octal - 0 to 7 - 75345662, decimal - 0 to 9 ex - 09876543321and hexa decimal
    handleMousePressed(){
        this.submit.mousePressed(()=>{
            var answer = this.input.value();
            var ans = parseInt(answer,10);
            var correctAns = this.x-this.y*this.z;
                if(correctAns===ans){
                    this.showMessage1();
                    gameState=2;
                }
                else{
                    this.showMessage2();
                }  
        }) 
    }

    display(){
       background("yellow"); 
       fill("black");
       textSize(50);
       text("This is level 2",350,50);

       fill("white");
       rectMode(CENTER);
       rect(250,200,100,100);
       rect(450,200,100,100);
       rect(650,200,100,100);
       textSize(50);
       fill("black");
       text("-",350,225);
       text("*",550,230);
       if(frameCount<145){
        textSize(50);
        fill("black");
        text(this.x,220,224);
        text(this.y,423,224);
        text(this.z,625,224);
       }
       this.setElementPosition();
       this.handleMousePressed();
    }

    showMessage1(){
        swal({
            title: `Awesome!`,
            text: "You gave the correct answer",
            imageUrl:
              "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
          });
    }

    showMessage2(){
        swal({
            title: `Oh Noooo!`,
            text: "Ohoooo, You gave the wrong answer. Better luck next time.",
            imageUrl:
              "https://github.githubassets.com/images/icons/emoji/unicode/1f610.png",
            imageSize: "100x100",
            confirmButtonText: "Ok"
          });
    }


}