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

     run: function() {
      //frequency
      var d = 2.0 * Math.PI / 60000.0;
      // init variables in a loop, putting balls in place
      for (var i = 0; i < this.numBalls; i++) {
           // -------- new ball
            this.balls.push(new Ball(10));
            this.balls[i].x =100;
            this.balls[i].y += 0;
            this.balls[i].frequency = d * (this.firstFrequency + i);
           // console.log( this.balls[i].frequency);
            this.balls[i].draw(this.context);
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

        for (var i = 0; i < this.numBalls; i++) {
            this.angle += 1;
            // x = radius*cos(t) + xcoordOfCentrePoint
            // y = radius*sin(t) + ycoordOfCentrePoint
             this.xPos = this.radius * Math.cos( Cradle.toRadians(this.angle) * this.amplitude ) + 100;
             this.yPos = this.radius * Math.sin(Cradle.toRadians(this.angle) * this.amplitude ) + 100;
             this.balls[i].x = this.xPos;
             this.balls[i].y = this.yPos;
             this.balls[i].draw(this.context);
        }
        console.log(this.angle);


       // this.tPos += 0.1;
     },
    toRadians: function(angle){
        //To convert from degrees to radians, multiply by (2 * pi) / 360 (or pi/180)
        return angle*Math.PI/180;
    }
}
