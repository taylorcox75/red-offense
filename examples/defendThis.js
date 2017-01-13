//This script must be executed without interference
// many commands here are part of the node-ar-drone: https://github.com/felixge/node-ar-drone 


// 1)  Take off
// 2)  Fly forward 20'
// 3)  Take a picture and save it     10pts
// 4)  Fly diagonally back and right  
// 5)  Perform a flip                 20pts
// 6)  Fly forward
// 7)  Take another picture           10pts
// 8)  Fly right 10'
// 9)  Execute a 360                  20pts
// 10) Fly right 10'
// 11) Start recording video
// 12) Fly back 20'
// 13) Stop recording video           20pts
// 14) Perform an animation           20pts
// 15) Return Home                    50pts
/*
       2,3       6,7-----8,9-----10,11
	   | \       |                   |
	   |  \      |                   |
	   |   \     |                   |
	   |    \    |                   |
	   |      4,5                    |
	   |                             |
	   |                             |
	  1,15_________________________12,14
*/

var arDrone = require('ar-drone');
var fs = require('fs');

// Create a arDrone client which will receive all further commands
var client = arDrone.createClient();
var pngStream = client.getPngStream();
var saving = false;

// Make sure the drone is on the ground before begining
client.land();


// Start flying, rise up and stop
client
  .after(2000, function(){
	  this.takeoff();
  })
  .after(2000, function(){
	  this.up(.5);
  })
  .after(2000, function(){
	  this.stop();
  });
console.log('Takeoff! here we go');

// Fly forward, 
client
  .after(5000, function(){
  this.front(.5);
  })
  .after(1000, function(){
  this.stop();
  });
  
// Take picture 1
saving = true;
  pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
	if (saving < 7) {
    if (now - lastFrameTime > period) {
      console.log('Saving frame');
	  saving = false; 
      fs.writeFile('picture1.png', pngBuffer, function(err) {
        if (err) {
          console.log('Error saving PNG: ' + err);
        }
      });
    }
	}
  });

// Fly diagonally back
  client
  .after(2000, function(){
  this.back(.5);
  this.right(.5);
  })
  .after(1000, function(){
  this.stop();
  });
  
// Perform a flip
client
  .after(1000, function(){
	  this.animate('flipRight', 1000);
  });
client
  .after(1000, function(){
   this.stop();
  });
  
// Fly forward 
client
  .after(2000, function(){
  this.front(.5);
  })
  .after(1000, function(){
  this.stop();
  });

// Take picture 2
saving = true; 

// Fly right 
client
  .after(2000, function(){
  this.right(.5);
  })
  .after(1000, function(){
  this.stop();
  });
  
// Perform a 360 turn
client.animate('turnaround', 1000);
client
  .after(1000, function(){
   this.stop();
  });
  
// Fly right 
client
  .after(2000, function(){
  this.right(.5);
  })
  .after(1000, function(){
  this.stop();
  });
  
// Start recording video

// Fly back 
client
  .after(2000, function(){
  this.back(.5);
  })
  .after(1000, function(){
  this.stop();
  });

// Stop recording video

// Perform a dance
client.animate('vzDance', 1000);
client
  .after(1000, function(){
   this.stop();
  });

// Fly home
client
  .after(6000, function(){
  this.left(.5);
  })
  .after(1000, function(){
  this.stop();
  this.land();
  });








// Save a single picture to file (same location as this progam)

/*
pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
      console.log('Saving frame');
      fs.writeFile('image.png', function(err) {
        if (err) {
          console.log('Error saving PNG: ' + err);
        }
      });
  });

  */
  

  
  
  
  