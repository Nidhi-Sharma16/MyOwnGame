class Form{
    constructor(){
        this.heading = createElement("h1");
        this.heading.html("Hello, This is level 1");
        this.submit = createButton("Submit");
        this.question = createElement("h1");
        this.input = createInput("").attribute("placeholder","Enter Your Answer");
        this.question.html("What is 2+3x4 ? Enter the answer in the box below.")

    }
     setElementPosition(){
         this.heading.position(400,50);
         this.question.position(120,150);
         this.input.position(270,280);
         this.submit.position(500,350);
     }

     hide(){
         this.heading.hide();
         this.question.hide();
         this.input.hide();
         this.submit.hide();
        
        }
        
        handleMousePressed(){
            this.submit.mousePressed(()=>{
                var answer = this.input.value();
                if(answer === "14"){
                    this.showMessage1();
                    level2.display();
                }
                else{
                    this.showMessage2();
                }
            })
            
        }
        display(){
            this.setElementPosition();
            this.handleMousePressed();
            level2 = new Level2();
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
 


