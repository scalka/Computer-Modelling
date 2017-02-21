/************************************************************
 * Beauriful, out-of-phase pendulums, the web page animation.
 * Copyright (c) 2011 Petr Sladek (slady)
 * License: CC BY-NC-SA 
 * http://slady.net/
 * http://petr.sladek.name/
 */    

// the pendulums object
pendulums = {
 // pendulums constants
 count: 15,
 firstFrequency: 51,
 // pendulums variables
 positions: [],
 frequencies: [],
 startTime: 0,
 // the pendulums init method
 run: function() {
  //frequency
  var d = 2.0 * Math.PI / 600000.0;

  var ballsHtml = '';
  //each ball in html
  var graphics = '<div class="pendulumsLine"><div class="pendulumsBall"></div></div>';
  // init variables in a loop, putting balls in place
  for (var i = 0; i < this.count; i++) {
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
  window.setInterval("pendulums.actualMove()", 30);
 },


 // the pendulums main method, started every 30 milliseconds
 actualMove: function() {
  // get the actual time

  var t = new Date().getTime() - this.startTime;
  // count the positins in a loop
  for (var i = 0; i < this.count; i++) {
   var c = Math.cos(t * this.frequencies[i]);

   // * 50  amplitude  how far left/right they go
   //-c        - cos position goes minus so we reverse it so it starts going right
   this.positions[i] = Math.round(-c * 50 + 50);
  }
  // set div positions
  var pos = this.positions;
  $('div#pendulumsInner div div').css("left", function(i) {
   return " " + (pos[i]) + "%"; });
 }
}

// run the pendulums after the web page will have been loaded
$(document).ready(function() {
 pendulums.run();
});
