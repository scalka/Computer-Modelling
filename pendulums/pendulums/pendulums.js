//colors for balls
var green = ' #3BAC50';
var red = '#e1465d';
var yellow = '#FFBF00';

//after web page is loaded run those functions
$(document).ready(function() {
    //get canvases
    var pendulums_canvas = document.getElementById("pendulumsDiv");
    var cradle_canvas = document.getElementById("cradle_canvas");
    //hide second canvas
    cradle_canvas.style.display = "none";
    //buttons for hiding/displaying particular canvases
    var btn_pendulum = document.getElementById("btn_pendulum");
    btn_pendulum.addEventListener('click', function(){
        cradle_canvas.style.display = "none";
        pendulums_canvas.style.display = "block";
    });
    var btn_cradle = document.getElementById("btn_cradle");
    btn_cradle.addEventListener('click', function(){
        cradle_canvas.style.display = "block";
        pendulums_canvas.style.display = "none";
    });
    //assign the canvas element  to a variable using the DOM
    var canvas1 = document.getElementById("canvas1");
    //assign the 2d rendering context (what we draw on) to a variable
    var context1 = canvas1.getContext("2d");
    //assign this context to Pendulum object
    Pendulums.context = context1;
    //create object and start animation
    Pendulums.run();
    //submit button 
    var submit = document.getElementById('submit');
        //changing colors and number of balls in the pendulum
        submit.addEventListener('click', function() {
            if (document.getElementById('amount_of_balls').value ){
                Pendulums.numBalls = document.getElementById('amount_of_balls').value;
            }
            var colorValue = document.getElementById('colorsSelect').value;
            if(colorValue === 'green'){
                Pendulums.color = green;
            } else if (colorValue === 'yellow'){
                Pendulums.color = yellow;
            }
             else if (colorValue === 'red'){
                Pendulums.color = red;
            }
            //reset the Pendulum animation with new values
            Pendulums.reset();
        });
    //second canvas for Newton's cradle animation
    var canvas2 = document.getElementById("canvas2");
    //assign the 2d rendering context (what we draw on) to a variable
    var context2 = canvas2.getContext("2d");
    //buttons for two different versions of animation
    var cradle1 = document.getElementById("cradle1");
    var cradle2 = document.getElementById("cradle2");
    //assign canvas and context to Cradle object
    Cradle.canvas = canvas2;
    Cradle.context = context2;
    //buttons to run the animations 
    cradle1.addEventListener('click', function(){
        Cradle.reset();
        Cradle.option = 1;
    });
    cradle2.addEventListener('click', function(){
        Cradle.reset();
        Cradle.option = 2;
    });
});

// the Pendulum Wave object
Pendulums = {
     //amount of balls
     numBalls: 15,
     //51 oscillations in 60 secods period
     firstFrequency: 51,
     frequencies: [],
     startTime: 0,
     balls: [],
     context: 0,
     color: green,

     // the Pendulums init method
     run: function() {
          //frequency
          var d = 2.0 * Math.PI / 60000.0;
          // init variables in a loop, putting balls in place
          for (var i = 0; i < this.numBalls; i++) {
                this.balls.push(new Ball(15));
                this.balls[i].color = this.color;
                this.balls[i].x = 0;
                this.balls[i].y = 200 + i*15 ;
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
        //for each ball change x value 
        for (var i = 0; i < this.numBalls; i++) {
             var cos = Math.cos( time * this.balls[i].frequency );
             // * 50  amplitude  how far left/right they go
             //-cos        - cos position goes minus so we reverse it so it starts going right
             this.balls[i].x = Math.round(-cos * 70 + 200);
             this.balls[i].draw(this.context);
             //strings which "holds" the balls
             this.context.beginPath();
             this.context.moveTo(200,0);
             this.context.lineTo(this.balls[i].x, this.balls[i].y);
             this.context.strokeStyle="#565656";
             this.context.stroke();
        }
    },
    //reset animation and values
    reset: function(){
            this.context.clearRect(0, 0, 900, 900);
            var newPend = Pendulums.run();
    }
}
//Newton's Cradle object
Cradle = {
     // amount of balls
     numBalls: 5,
     startTime: 0,
     balls: [],
     context: 0,
     canvas: 0,
     radius: 20,
     spring: 0.1,
     friction: 0.95,
     targetX: 320,
     vx: 0, // velocity
     cradleVersion: 1,
     ax: 0, // acceleration

     run: function() {
        // init variables in a loop, putting balls in place
        for (var i = 0; i < this.numBalls; i++) { 
            //placing new ball on the canvas
            this.balls.push(new Ball(20));
            this.balls[i].x = 200 + 40*i;
            this.balls[i].y = 300;
            //to be used later while drawing the strings which "holds" balls
            this.balls[i].lineX = this.balls[i].x;
            this.balls[i].lineY = this.balls[i].y - 300;
            //draw balls
            this.balls[i].draw(this.context);
            //draw strings
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
        this.context.clearRect(0, 0, 900, 900);
        var time = new Date().getTime() - this.startTime;
        var d = 2.0 * Math.PI / 60000.0;
        this.ax = Math.cos( d * time * 10) * this.spring;
        this.vx += this.ax;
        this.vx *= this.friction;
        //drawing balls depending on cradle's option selected
        switch(this.option) {
            //first and last balls are moving
            case 1:
                //values for x and y when first ball is moving
                if (utils.intersects(this.balls[0].getBounds(),  this.balls[1].getBounds())) {
                  this.balls[4].x += this.vx;
                  this.balls[4].x += 0;
                  this.balls[4].y -= this.vx * 0.2;
                }
                //values for x and y when last ball is moving
                if (utils.intersects(this.balls[3].getBounds(),  this.balls[4].getBounds())){
                  //console.log("first ball");
                  this.balls[0].x += this.vx ;
                  this.balls[4].x += 0;  

                  this.balls[0].y += this.vx * 0.2;
                }
                break;
            //three ball swing
            case 2:
                //values for x and y when left side balls is moving
                if (utils.intersects(this.balls[1].getBounds(),  this.balls[2].getBounds())) {
                  this.balls[0].x += this.vx;
                  this.balls[1].x += this.vx;
                  this.balls[2].x += this.vx;
                  this.balls[3].x += 0;
                  this.balls[4].x += 0;

                  this.balls[0].y += this.vx * 0.2;
                  this.balls[1].y += this.vx * 0.2;
                  this.balls[2].y += this.vx * 0.2;
            
                }
                //values for x and y when right side balls is moving
                if (utils.intersects(this.balls[2].getBounds(),  this.balls[3].getBounds())){
                  this.balls[0].x += 0;
                  this.balls[1].x += 0;
                  this.balls[2].x += this.vx;
                  this.balls[3].x += this.vx;
                  this.balls[4].x += this.vx;

                  this.balls[2].y -= this.vx * 0.2;
                  this.balls[3].y -= this.vx * 0.2;
                  this.balls[4].y -= this.vx * 0.2;
                }
                break;
            default:
                if (utils.intersects(this.balls[0].getBounds(),  this.balls[1].getBounds())) {
                  //console.log("last ball");
                  this.balls[4].x += this.vx;
                  this.balls[0].x += 0;
                }
                if (utils.intersects(this.balls[3].getBounds(),  this.balls[4].getBounds())){
                  //console.log("first ball");
                  this.balls[0].x += this.vx ;
                  this.balls[4].x += 0;  
                }
        }                   
        this.balls[0].draw(this.context);
        this.balls[1].draw(this.context);
        this.balls[2].draw(this.context);
        this.balls[3].draw(this.context);
        this.balls[4].draw(this.context);
        //drawing strings
        this.context.strokeStyle="#565656";
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
     },
     //reset animation and values
    reset: function(){
            //this.context.clearRect(0, 0, 900, 900);
            var newCradle = Cradle.run();
    }
}
