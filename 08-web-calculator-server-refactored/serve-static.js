var path = require('path'),
    fs = require('fs');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStaticResource(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0
}

function serveStatic(req, res, next){
    var resourceName = req.urlObj.pathname;
    if (isStaticResource(resourceName)){
        var resPath = path.join(__dirname, resourceName);
        if (!fs.existsSync(resPath)){
            return next();
        }
        var stream = fs.createReadStream(resPath);
        stream.pipe(res);
        stream.on('end', function(){
            next();
        });
    } else {
        next();
    }
}

module.exports = serveStatic;