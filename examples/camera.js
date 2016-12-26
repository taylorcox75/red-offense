var drone = require("./stream_dep/lib/server"),
 http = require("http");

var server = http.createServer(function(req, res) {
  require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});

drone.listen(server, {ip: "192.168.2.7"});
server.listen(5555);