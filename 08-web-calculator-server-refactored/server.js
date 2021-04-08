var http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    serve404 = require('./serve404');

var middlewares = [ dataParser, serveStatic, serveCalculator, serve404 ];

function exec(req, res, middlewares){
    var first = middlewares[0],
        remaining = middlewares.slice(1),
        next = function(){
            exec(req, res, remaining)
        };
    if (typeof first === 'function'){
        first(req, res, next);
    }
}

var server = http.createServer(function(req , res){
    exec(req, res, middlewares);
});

server.listen(8080);

server.on('listening', function(){
    console.log('calculator-web-server is listening on port 8080');
});