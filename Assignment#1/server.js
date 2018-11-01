/**
 * 
 * Server configuration file containing server router, handler, main function and environment configuration
 * 
 */

const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

var serverConfig = {};

// Server main handler
serverConfig.serverMain = function(req, res) {    
    var parsedUrl = url.parse(req.url);
    var routePath = typeof(parsedUrl.pathname) !== 'undefined' ? parsedUrl.pathname.replace(/^\/+|\/+$/g, '') : '';
    var method = req.method.toLowerCase();
    
    var body = '';
    var decoder = new StringDecoder('utf-8');
    req.on('data', function(data) {
        body += decoder.write(data);
    });

    req.on('end', function() {
        body += decoder.end();

        var data = {
            'routePath' : routePath,
            'method' : method,
            'body' : body
        }
        var selectedHandler = typeof(serverConfig.router[routePath]) !== 'undefined' ? serverConfig.router[routePath]: serverConfig.handlers.notfound;        
        
        selectedHandler(data, function(statusCode, payload) {
            statusCode = typeof(statusCode) === 'number' ? statusCode : 400;
            var payloadString = typeof(payload) === 'object' ? JSON.stringify(payload) : '';

            console.log("Response = ", statusCode, payloadString);
            
            res.setHeader('Content-Type', 'application/json');
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    });    
};

// Server route handlers
serverConfig.handlers = {};

serverConfig.handlers.hello = function(data, callback) {
    if (data.method !== 'post')
        serverConfig.handlers.notfound(data, callback);

    if (data.body === '') {
        serverConfig.handlers.defaultHello(data, callback);
        return;
    }                

    try {
        var helloBody = JSON.parse(data.body);

        var firstName = typeof(helloBody.firstName) === 'string' ? helloBody.firstName : '';
        var lastName = typeof(helloBody.lastName) === 'string' ? helloBody.lastName : '';
        var fullName = firstName + " " + lastName;        
        
        if (firstName === '' && lastName === '')
            serverConfig.handlers.defaultHello(data, callback);
        else
            callback(200, {'message' : 'Hi, ' + fullName.trim() + ' ! Greetings from the Hello API!'});
    } catch(e) {
        callback(400, {'message' : 'invalid request body'});
    }
};

serverConfig.handlers.notfound = function(data, callback) {
    callback(404, {'message' : 'route not found'});
};

serverConfig.handlers.defaultHello  = function(data, callback) {
    callback(200, {'message' : 'Hi, there! Greetings from the Hello API!'});
};

// Server router
serverConfig.router = {
    'hello' : serverConfig.handlers.hello
};

module.exports = serverConfig;