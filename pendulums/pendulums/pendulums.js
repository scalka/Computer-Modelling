// run the Pendulums after the web page will have been loaded
$(document).ready(function() {
  //assign the canvas element  to a variable using the DOM
    var canvas = document.getElementById("canvas1");
    //assign the 2d rendering context (what we draw on) to a variable
    var context = canvas.getContext("2d");

    Pendulums.context = context;
    Pendulums.run(context, canvas);

    var submit = document.getElementById('submit');
        submit.addEventListener('click', function() {
        Pendulums.numBalls = document.getElementById('amount_of_balls').value;
        Pendulums.firstFrequency = document.getElementById('firstFrequency').value;
        Pendulums.run();
    });

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
            console.log( this.balls[i].frequency);
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




var amount_of_balls;
var firstFrequency;

