function serve404(req, res, next){
    if (!res.finished){
        res.statusCode = 404;
        res.end();
        next();
    }
}

module.exports = serve404;
