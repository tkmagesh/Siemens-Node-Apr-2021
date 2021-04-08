function serve404(req, res, next){
    if (!res.finished){
        console.log('[@serve404] serving 404');
        res.statusCode = 404;
        res.end();
        next();
    }
}

module.exports = serve404;
