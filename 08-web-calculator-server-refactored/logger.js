function logger(req, res, next){
    var startTime = new Date();
    var logMessage = req.method + '\t' + req.urlObj.pathname;
    res.on('finish', function(){
        var endTime = new Date(),
            elapsed = endTime - startTime;
        logMessage += '\t' + res.statusCode + '\t' + elapsed + 'ms';
        console.log(logMessage);
    });
    next();
}

module.exports = logger;