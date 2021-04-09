var querystring = require('querystring');
function dataParser(req, res, next){
    var urlObj = new URL(req.url, 'http://localhost:8080');
    req['urlObj'] = urlObj;
    req['query'] = querystring.parse(req.urlObj.search.substr(1));
    var rawData = '';
    req.on('data', function(chunk){
        rawData += chunk;
    });
    req.on('end', function(){
        //to be refactored to 'data parser'
        req['body'] = querystring.parse(rawData);
        next();
    });
}

module.exports = dataParser;