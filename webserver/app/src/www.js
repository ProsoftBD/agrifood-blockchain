"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("./server");
var http = require("http");
var debug = require("debug");
var httpPort = normalizePort(process.env.PORT || 8080);
var app = server_1.Server.bootstrap().app;
app.set("port", httpPort);
var httpServer = http.createServer(app);
//listen on provided ports
httpServer.listen(httpPort);
//add error handler
httpServer.on("error", onError);
//start listening on port
httpServer.on("listening", onListening);
/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    var port = Number(val);
    if (isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
}
function onError(error) {
    if (error.syscall !== "listen") {
        throw error;
    }
    var bind = typeof httpPort === "string"
        ? "Pipe " + httpPort
        : "Port " + httpPort;
    // handle specific listen errors with friendly messages
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
}
/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
    var addr = httpServer.address();
    var bind = typeof addr === "string"
        ? "pipe " + addr
        : "port " + addr.port;
    debug("Listening on " + bind);
}
