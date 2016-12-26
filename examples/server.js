var drone = require("./stream_dep/lib/server"),
    http = require("http"),
    arDrone = require('ar-drone'),
    keypress = require('keypress');

/**
 * Initializes and creates the server, viewable on index.html (localhost:5555)
 */
var server = http.createServer(function (req, res) {
    require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server, {ip: "192.168.2.7"});
server.listen(5555);

/**
 * This code creates an arDrone client (reffered to as a Repl in ar-drone), and looks for keypresses in stdin
 * As the ar-drone author stated,  set navdata to true so we recieve information
 * Fly status is set to false so that the space bar can be dual purpose
 */
var client = arDrone.createClient();
client.createRepl();
keypress(process.stdin);
client.config('general:navdata_demo', 'TRUE');
client._ref.fly = false;

/**
 * These lines of code look for a keypress on stdin.  When one is recieved, it is determined
 * the type of command, and it goes to the corresponding function call.
 */
process.stdin.on('keypress', function (ch, key) {
    // console.log('got "keypress"', key);
    if (key.name === 'space' && client._ref.fly) {
        client.land();
        console.log('Client Landed');
        console.log("Battery: " + client._lastBattery);
    } else if (key.name === 'space') {
        console.log('Spinning Up!');
        client.takeoff();
        console.log("Battery: " + client._lastBattery);
    } else if (key.name === 'w') {
        console.log('\nGoing Up!');
        client.up(1)
    } else if (key.name === 's') {
        console.log('Going Down!');
        client.down(1)
    } else if (key.name === 'a') {
        console.log('Rotating CCW');
        client.counterClockwise(.5)
    } else if (key.name === 'd') {
        console.log('Rotating CW');
        client.clockwise(.5)
    } else if (key.name === 'up') {
        console.log('Going Forward');
        client.front(1)
    } else if (key.name === 'down') {
        console.log('Going Backwards');
        client.back(1)
    } else if (key.name === 'left') {
        console.log('To The Left <-');
        client.left(1)
    } else if (key.name === 'right') {
        console.log('To The Right ->');
        client.right(1)
    }  else if (key.name == 'o') {
        console.log('Flip Left');
        client.animate('flipLeft', 1000);
        client.stop();
    } else if (key.name == 'p') {
        console.log('Flip Right');
        client.animate('flipRight', 1000);
        client.stop();
    } else if (key.name == 'b') {
        console.log("Battery: " + client._lastBattery);
        client.stop();
    } else if (key.name == 'x') {
        console.log("Stopped!");
        client.stop();
    }

});
//noinspection JSUnresolvedFunction
process.stdin.setRawMode(true);
process.stdin.resume();


