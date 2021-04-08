
function dataParser(req){
    var urlObj = new URL(req.url, 'http://localhost:8080');
    req['urlObj'] = urlObj;
}

module.exports = dataParser;