/*
*
* Simple hello world API that responds with a custom greeting message
* 
*/

const http = require('http');
const https = require('https');
const environmentConfig = require('./config');
const serverConfig = require('./server');

var httpServer = http.createServer(serverConfig.serverMain);
httpServer.listen(environmentConfig.httpPort, function() {
    console.log(environmentConfig.envName + 'server listening on port ' + environmentConfig.httpPort);
});