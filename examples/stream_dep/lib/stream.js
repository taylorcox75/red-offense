/*jshint node:true*/
/*
 * Sets up a real stream + attaches it to a server
 */
module.exports.attach = function droneStream(server, options) {
    'use strict';
    var WebSocketServer = require('ws').Server,
        wss = new WebSocketServer({server: server, path: '/dronestream'}),
        sockets = [],
        Parser = require('./PaVEParser'),
        arDrone = require('ar-drone');

    options = options || {};
    options.timeout = options.timeout || 4000;

    function init() {

        var tcpVideoStream, parser;

        if (!options.tcpVideoStream) {
            tcpVideoStream = new arDrone.Client.PngStream.TcpVideoStream(
                options
            );

            console.log(
                "*****\tConnecting to drone on %s", options.ip || "192.168.1.1\t*****"
            );

            tcpVideoStream.connect();
            tcpVideoStream.on('error', function (err) {
                console.log('*****\tThere was an error: %s\t*****', err.message);
                tcpVideoStream.end();
                tcpVideoStream.emit("end");
                init();
            });
        } else {
            tcpVideoStream = options.tcpVideoStream;
        }

        parser = new Parser();
        tcpVideoStream.on('data', function (data) {
            parser.write(data);
        });
        parser.on('data', function (data) {
            sockets.forEach(function (socket) {
                socket.send(data, {binary: true});
            });
        });
    }
    init();

    wss.on('connection', function (socket) {
        sockets.push(socket);

        socket.on("close", function () {
            console.log("*****\tClosing socket\t*****");
            sockets = sockets.filter(function (el) {
                return el !== socket;
            });
        });
    });
};
