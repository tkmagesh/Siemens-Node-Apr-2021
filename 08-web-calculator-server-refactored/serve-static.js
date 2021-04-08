var path = require('path'),
    fs = require('fs');

var staticResExtns = ['.html', '.js', '.css', '.jpg', '.png', '.ico', '.xml', '.txt', '.json'];

function isStaticResource(resourceName){
    return staticResExtns.indexOf(path.extname(resourceName)) >= 0
}

function serveStatic(req, res){
    var resourceName = req.urlObj.pathname;
    if (isStaticResource(resourceName)){
        var resPath = path.join(__dirname, resourceName);
        if (!fs.existsSync(resPath)){
            res.statusCode = 404;
            res.end();
            return;
        }
        var stream = fs.createReadStream(resPath);
        //stream.pipe(res);
        stream.on('data', function(chunk){
            console.log('[@serve-static] read and writing chunk');
            res.write(chunk);
        });
        stream.on('end', function(){
            console.log('[@serve-static] end of stream')
            res.end();
        });
    } 
}

module.exports = serveStatic;