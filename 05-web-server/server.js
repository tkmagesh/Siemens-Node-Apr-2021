
var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    url = require('url');

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){
    //this function executes whenever a new connection is established
    var urlObj = new URL(req.url, 'http://localhost:8080');
    var resourceName = urlObj.pathname;
    console.log(req.method + '\t' + resourceName);
    var resPath = path.join(__dirname, resourceName);
    if (!fs.existsSync(resPath)){
        res.statusCode = 404;
        res.end();
        return;
    }
    var stream = fs.createReadStream(resPath);
    stream.pipe(res);
});

server.listen(8080);

server.on('listening', function(){
    console.log('server is listening on port 8080');
});