window.onload = function () {
      var canvas = document.getElementById('myCanvas'),
          context = canvas.getContext('2d'),
         // mouse = utils.captureMouse(canvas),
          balls = [],
          spring = 0.03,
          friction = 0.9,
          gravity = 2,

          ballsNum = 5;
          //51 oscillations in this 60 second period
         firstFrequency = 51,
         // Pendulums variables
         positions = [],
         frequencies = [],
         startTime = 0;

      while (ballsNum--) {
        console.log("log");
        balls.push(new Ball(20));
      }

      function move (ball) {
        // get the actual time
        var t = new Date().getTime() - this.startTime;
        // ballsNum the positins in a loop
        for (var i = 0; i < this.ballsNum; i++) {
         var c = Math.cos(t * this.frequencies[i]);
         // * 50  amplitude  how far left/right they go
         //-c        - cos position goes minus so we reverse it so it starts going right
         this.positions[i] = Math.round(-c * 50 + 100);
        }
        // set div positions
        ball.x = this.positions[i];
        /*$('div#pendulumsInner div div').css("left", function(i) {
         return " " + (pos[i]) + "%"; });*/
/*
        ball.vx += (targetX - ball.x) * spring;
        ball.vy += (targetY - ball.y) * spring;
        ball.vy += gravity;
        ball.vx *= friction;
        ball.vy *= friction;
        ball.x += ball.vx;
        ball.y += ball.vy;*/
      }
      function draw (ballB, i) {
        var d = 2.0 * Math.PI / 60000.0;
        for (var i = 0; i < this.ballsNum; i++) {
         this.positions[i] = 0;
         //freqency difference
         //lower balls has higher frequency 
         //if deleting i all goes at the same frequency
         //out of phase
         this.frequencies[i] = d * (this.firstFrequency + i);
         ballsHtml += graphics;
        }

        // get the starting time
        this.startTime = new Date().getTime();
       // same as above
       // this.startTime = Date.now();
        console.log(this.startTime);
        // prepare the document
        $("div#pendulumsInner").html(ballsHtml);
        // start timer
        window.setInterval("Pendulums.actualMove()", 30);

      

        //if first ball, move to mouse
        if (i === 0) {
          /*move(ballB, mouse.x, mouse.y);
          context.moveTo(mouse.x, mouse.y);*/
        } else {
          var ballA = balls[i-1];
          move(ballB, ballA.x, ballA.y);
          context.moveTo(ballA.x, ballA.y);
        }
        context.lineTo(ballB.x, ballB.y);
        context.stroke();
        ballB.draw(context);
      }

      (function drawFrame () {
        window.requestAnimationFrame(drawFrame, canvas);
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.beginPath();
        balls.forEach(draw);
      }());
    };