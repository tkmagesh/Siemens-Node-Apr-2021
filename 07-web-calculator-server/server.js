var http = require('http'),
    path = require('path'),
    fs = require('fs'),
    querystring = require('querystring'),
    calculator = require('./calculator');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStaticResource(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0
}

var server = http.createServer(function(req /* IncomingMessage */, res /* ServerResponse */){
    //this function executes whenever a new connection is established
    var urlObj = new URL(req.url, 'http://localhost:8080');
    var resourceName = urlObj.pathname;
    console.log(req.method + '\t' + resourceName);

    if (isStaticResource(resourceName)){
        var resPath = path.join(__dirname, resourceName);
        if (!fs.existsSync(resPath)){
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resPath);
        stream.pipe(res);
    } else if (urlObj.pathname === '/calculator') {
        var querystringObj = querystring.parse(urlObj.search.substr(1));
        if (req.method === 'GET'){
            var n1 = parseInt(querystringObj.x, 10),
                n2 = parseInt(querystringObj.y, 10),
                op = querystringObj.op;
            if (!calculator.hasOwnProperty(op)){
                res.statusCode = 400;
                res.end();
                return;
            }
            var result = calculator[op](n1, n2);
            res.write(result.toString());
            res.end();
        } else if (req.method === 'POST'){
            var rawData = '';
            req.on('data', function(chunk){
                rawData += chunk;
            });
            req.on('end', function(){
                var bodyObj = querystring.parse(rawData);
                var n1 = parseInt(bodyObj.x, 10),
                    n2 = parseInt(bodyObj.y, 10),
                    op = bodyObj.op;
                if (!calculator.hasOwnProperty(op)){
                    res.statusCode = 400;
                    res.end();
                    return;
                }
                var result = calculator[op](n1, n2);
                res.write(result.toString());
                res.end();
            })
        } else {
            res.statusCode = 400;
            res.end();
        }
    } else {
        res.statusCode = 404;
        res.end();
    }
});

server.listen(8080);

server.on('listening', function(){
    console.log('calculator-web-server is listening on port 8080');
});