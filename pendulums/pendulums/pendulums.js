// run the Pendulums after the web page will have been loaded
$(document).ready(function() {
  //assign the canvas element  to a variable using the DOM
    var canvas1 = document.getElementById("canvas1");
    //assign the 2d rendering context (what we draw on) to a variable
    var context = canvas1.getContext("2d");
    Pendulums.context = context;
    Pendulums.run();

    var submit = document.getElementById('submit');
        submit.addEventListener('click', function() {
        Pendulums.numBalls = document.getElementById('amount_of_balls').value;
        Pendulums.firstFrequency = document.getElementById('firstFrequency').value;
        Pendulums.run();
    });


    var canvas2 = document.getElementById("canvas2");
    //assign the 2d rendering context (what we draw on) to a variable
    var context2 = canvas2.getContext("2d");
    Cradle.context = context2;
    Cradle.run();



});

// the Pendulums object
Pendulums = {
     // amount of balls -  Pendulums constants
     numBalls: 15,
     //51 oscillations in this 60 second period
     firstFrequency: 51,
     // Pendulums variables
     positions: [],
     frequencies: [],
     startTime: 0,
     balls: [],
     context: 0,
     requestAnimationFrame: window.requestAnimationFrame,

     // the Pendulums init method
     run: function() {
      //frequency
      var d = 2.0 * Math.PI / 60000.0;
      // init variables in a loop, putting balls in place
      for (var i = 0; i < this.numBalls; i++) {
           // -------- new ball
            this.balls.push(new Ball(10));
            this.balls[i].x = 50;
            this.balls[i].y += 200 + i*10 ;
            this.balls[i].frequency = d * (this.firstFrequency + i);
            this.balls[i].draw(this.context);
      }

      // get the starting time
      this.startTime = new Date().getTime();
      // start timer
      window.setInterval("Pendulums.actualMove()", 30);
     },
     // the Pendulums main method, started every 30 milliseconds
     actualMove: function() {
        this.context.clearRect(0, 0, 900, 900);
        // get the actual time
        var time = new Date().getTime() - this.startTime;
        // numBalls the positins in a loop

        //for balls[]
        for (var i = 0; i < this.numBalls; i++) {
             var cos = Math.cos( time * this.balls[i].frequency );
             // * 50  amplitude  how far left/right they go
             //-cos        - cos position goes minus so we reverse it so it starts going right
             this.positions[i] = Math.round(-cos * 50 + 100);
             this.balls[i].x = this.positions[i];
             this.balls[i].draw(this.context);

             this.context.beginPath();
             this.context.moveTo(100,0);
             this.context.lineTo(this.balls[i].x, this.balls[i].y);
             this.context.stroke();
        }
     }


}



Cradle = {
     // amount of balls -  Pendulums constants
     numBalls: 5,
     //51 oscillations in this 60 second period
     firstFrequency: 51,
     // Pendulums variables
     positions: [],
     frequencies: [],
     startTime: 0,
     balls: [],
     context: 0,
     tPos: 0,
     angle: 30,
     xPos: 0,
     yPos: 0,
     radius: 100,
     amplitude: 50,

     spring: 0.03,
     friction: 0.95,
     targetX: 320,
     vx: 0,

     run: function() {
        //frequency
        var d = 2.0 * Math.PI / 60000.0;
      // init variables in a loop, putting balls in place
      for (var i = 0; i < this.numBalls; i++) {
           // -------- new ball
            this.balls.push(new Ball(20));
            this.balls[i].x = 100 + 40*i;
            this.balls[i].y = 300;

            this.balls[i].lineX = this.balls[i].x;
            this.balls[i].lineY = this.balls[i].y - 200;
            this.balls[i].targetX = this.balls[i].x - 50;
            this.balls[i].frequency = d * (this.firstFrequency + i);
            
            this.balls[i].draw(this.context);


            this.context.beginPath();
            this.context.moveTo(this.balls[i].x, this.balls[i].y - 200);
            this.context.lineTo(this.balls[i].x , this.balls[i].y - 20);
            this.context.stroke();
      }
      // get the starting time
      this.startTime = new Date().getTime();
      // start timer
      window.setInterval("Cradle.animate()", 30);
     },
     // the Pendulums main method, started every 30 milliseconds
     animate: function() {
        //for balls[]
        this.context.clearRect(0, 0, 900, 900);
        var time = new Date().getTime() - this.startTime;

                var d = 2.0 * Math.PI / 60000.0;
                var dx = Math.cos( d * time * 10);
                var ax = dx * this.spring;

                this.vx += ax;
                this.vx *= this.friction;

                
                
                    
                    
                   // this.balls[4].x += this.vx;
                    this.balls[4].draw(this.context);
                if (utils.intersects(this.balls[0].getBounds(),  this.balls[1].getBounds())) {
                  console.log("last ball");
                  this.balls[4].x += this.vx;
                  this.balls[0].x += 0;
                  

                }
                if (utils.intersects(this.balls[3].getBounds(),  this.balls[4].getBounds())){
                  console.log("first ball");
                  this.balls[0].x += this.vx;
                  this.balls[4].x += 0;
                  
                }

                this.balls[0].draw(this.context);
                this.balls[4].draw(this.context);

                this.balls[1].draw(this.context);
                this.balls[2].draw(this.context);
                this.balls[3].draw(this.context);

                this.context.beginPath();
                    this.context.moveTo(this.balls[4].lineX, this.balls[4].lineY);
                    this.context.lineTo(this.balls[4].x , this.balls[4].y - 20);
                    this.context.stroke();
                this.context.beginPath();
                    this.context.moveTo(this.balls[0].lineX, this.balls[0].lineY);
                    this.context.lineTo(this.balls[0].x , this.balls[0].y - 20);
                    this.context.stroke();
                this.context.beginPath();
                    this.context.moveTo(this.balls[1].lineX, this.balls[1].lineY);
                    this.context.lineTo(this.balls[1].x , this.balls[1].y - 20);
                    this.context.stroke();
                this.context.beginPath();
                    this.context.moveTo(this.balls[2].lineX, this.balls[2].lineY);
                    this.context.lineTo(this.balls[2].x , this.balls[2].y - 20);
                    this.context.stroke();
                this.context.beginPath();
                    this.context.moveTo(this.balls[3].lineX, this.balls[3].lineY);
                    this.context.lineTo(this.balls[3].x , this.balls[3].y - 20);
                    this.context.stroke();

     }
}
