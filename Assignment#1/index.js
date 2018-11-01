/*
*
* Simple hello world API that responds with a custom greeting message
* 
*/

const http = require('http');
const https = require('https');

const serverConfig = require('./server');

var httpServer = http.createServer(serverConfig.serverMain);
httpServer.listen(4000, function() {
    console.log('server listening on port 4000');
});