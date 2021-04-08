var http = require('http'),
    calculator = require('./calculator'),
    querystring = require('querystring');

var server = http.createServer(function(req, res){
    var urlObj = new URL(req.url, 'http://localhost:9090');
    var querystringObj = querystring.parse(urlObj.search.substr(1));
    if (urlObj.pathname !== '/calculator'){
        res.statusCode = 404;
        res.end();
        return;
    }
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
})

server.listen(9090);

server.on('listening', function(){
    console.log('Calculator server listening on 9090');
})