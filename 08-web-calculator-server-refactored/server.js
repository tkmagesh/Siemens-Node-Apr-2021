var http = require('http'),
    dataParser = require('./data-parser'),
    serveStatic = require('./serve-static'),
    serveCalculator = require('./serve-calculator'),
    serve404 = require('./serve404');

var server = http.createServer(function(req , res){
    dataParser(req);
    console.log(req.method + '\t' + req.urlObj.pathname);
    serveStatic(req, res);
    serveCalculator(req, res);
    serve404(res);
});

server.listen(8080);

server.on('listening', function(){
    console.log('calculator-web-server is listening on port 8080');
});