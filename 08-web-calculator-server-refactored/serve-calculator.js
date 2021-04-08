var querystring = require('querystring'),
    calculator = require('./calculator');

function serveCalculator (req, res, next){
    if (req.urlObj.pathname === '/calculator') {
        //to be refactored to 'data parser'
        var querystringObj = querystring.parse(req.urlObj.search.substr(1));
        if (req.method === 'GET'){
            var n1 = parseInt(querystringObj.x, 10),
                n2 = parseInt(querystringObj.y, 10),
                op = querystringObj.op;
            if (!calculator.hasOwnProperty(op)){
                res.statusCode = 400;
                res.end();
                return next();
            }
            var result = calculator[op](n1, n2);
            res.write(result.toString());
            res.end();
            next();
        } else if (req.method === 'POST'){
            var rawData = '';
            req.on('data', function(chunk){
                rawData += chunk;
            });
            req.on('end', function(){
                //to be refactored to 'data parser'
                var bodyObj = querystring.parse(rawData);
                var n1 = parseInt(bodyObj.x, 10),
                    n2 = parseInt(bodyObj.y, 10),
                    op = bodyObj.op;
                if (!calculator.hasOwnProperty(op)){
                    res.statusCode = 400;
                    res.end();
                    return next();
                }
                var result = calculator[op](n1, n2);
                res.write(result.toString());
                res.end();
                next();
            })
        } else {
            res.statusCode = 400;
            res.end();
            next();
        }
    } else {
        next();
    }
}

module.exports = serveCalculator;

