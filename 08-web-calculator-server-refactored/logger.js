var chalk = require('chalk');

function logger(req, res, next){
    var startTime = new Date();
    var logMessage = chalk.red(req.method) + '\t' + chalk.yellow(req.urlObj.pathname);
    res.on('finish', function(){
        var endTime = new Date(),
            elapsed = endTime - startTime;
        logMessage += '\t' + chalk.blue(res.statusCode) + '\t' + chalk.bgCyan(elapsed) + 'ms';
        console.log(logMessage);
    });
    next();
}

module.exports = logger;