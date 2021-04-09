var querystring = require('querystring'),
    calculator = require('./calculator');

function serveCalculator (req, res, next){
    if (req.urlObj.pathname === '/calculator') {
        //to be refactored to 'data parser'
        var calculatorData = req.method === 'GET' ? req.query : req.body;
        var n1 = parseInt(calculatorData.x, 10),
            n2 = parseInt(calculatorData.y, 10),
            op = calculatorData.op;
        if (!calculator.hasOwnProperty(op)){
            res.statusCode = 400;
            res.end();
            return next();
        }
        var result = calculator[op](n1, n2);
        res.write(result.toString());
        res.end();
        next();
    } else {
        next();
    }
}

module.exports = serveCalculator;

