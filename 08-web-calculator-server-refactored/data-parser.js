
function dataParser(req, res, next){
    var urlObj = new URL(req.url, 'http://localhost:8080');
    req['urlObj'] = urlObj;
    next();
}

module.exports = dataParser;