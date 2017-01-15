//Requires using nodejs and installing FFMPEG as http://www.wikihow.com/Install-FFmpeg-on-Windows ***change PATH variable instead of temp variable***

var arDrone = require('ar-drone');
var client = arDrone.createClient();
var fs = require('fs');

var pngStream = client.getPngStream();
var frameCounter = 0;
var period = 10000; // Save a picture every 10000 ms.
var lastFrameTime = 0;

client.takeoff(); // Takeoff

pngStream
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    var now = (new Date()).getTime();
    if (now - lastFrameTime > period) {
      frameCounter++;
      lastFrameTime = now;
      console.log('Saving frame');
      fs.writeFile('frame' + now + '.png', pngBuffer, function(err) {
        if (err) {
          console.log('Error saving PNG: ' + err);
        }
      });
    }
  });